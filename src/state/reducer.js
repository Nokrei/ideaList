export const initialState = { ideas: [] };

export default function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ideas: [...state.ideas, action.newIdea] };

    case "delete":
      return {
        ...state,
        ideas: state.ideas.filter(
          (idea) => idea.createdAt !== action.createdAt
        ),
      };

    case "copyFromLocal": {
      return {
        ...state,
        ideas: action.payload,
      };
    }

    case "sortByDate":
      return {
        ...state,
        ideas: state.ideas.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1)),
      };

    case "sortByTitle":
      return {
        ...state,
        ideas: state.ideas.sort((a, b) => (a.title > b.title ? 1 : -1)),
      };
  }
}
