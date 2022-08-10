import counterReducer from "./reducer";
import deepFreeze from "deep-freeze";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok:0,
    bad: 0
  }

  test("should return a proper initial state when called with undefined state", () => {
    const state = [];
    const action = {
      type: "DO_NOTHING"
    };

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })
   
  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState
// ensures that the reducer does not change the state of the store given to it as a parameter.
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: good,
      bad: 0
    })
  })
  });

