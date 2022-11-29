const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const { UserInputError, AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const Person = require("./models/person");
const User = require("./models/user");

const JWT_SECRET = "TOP_SECRET";

const resolvers = {
	// query
	Query: {
		personCount: async () => Person.collection.countDocuments(),
		allPersons: async (root, args) => {
			console.log("Person.find");
			if (!args.phone) {
				return Person.find({});
			}

			return Person.find({ phone: { $exists: args.phone === "YES" } });
		},

		findPerson: async (root, args) => Person.findOne({ name: args.name }),

		me: (root, args, context) => {
			return context.currentUser;
		},
	},

	// resolver for address field of type Person
	//
	// the parameter root is the person object
	Person: {
		address: (root) => {
			return {
				street: root.street,
				city: root.city,
			};
		},
		// resolver of friendOf field of type Person
		//
		// search from all User objects the ones which have root._id in their friends list

		friendOf: async (root) => {
			const friends = await User.find({
				friends: {
					$in: [root._id],
				},
			});
			console.log("User.find");
			return friends;
		},
	},

	// mutation
	Mutation: {
		addPerson: async (root, args, context) => {
			const person = new Person({ ...args });
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

			try {
				await person.save();
				currentUser.friends = currentUser.friends.concat(person);
				await currentUser.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}

			pubsub.publish("PERSON_ADDED", { personAdded: person });
			return person;
		},

		editNumber: async (root, args) => {
			const person = await Person.findOne({ name: args.name });
			person.phone = args.phone;

			try {
				await person.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
			return person.save();
		},

		createUser: async (root, args) => {
			const user = new User({ username: args.username });
			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw new UserInputError("wrong credentials");
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, JWT_SECRET) };
		},

		addAsFriend: async (root, args, { currentUser }) => {
			console.log("currentUser", currentUser);
			const isFriend = (person) =>
				currentUser.friends
					.map((f) => f._id.toString())
					.includes(person._id.toString());

			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

			const person = await Person.findOne({ name: args.name });

			if (!isFriend(person)) {
				currentUser.friends = currentUser.friends.concat(person);
			}
			await currentUser.save();

			return currentUser;
		},
	},

	Subscription: {
		personAdded: {
			subscribe: () => pubsub.asyncIterator("PERSON_ADDED"),
		},
	},
};

module.exports = resolvers;
