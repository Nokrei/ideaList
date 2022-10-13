export const initialState = { ideas: [] };

export default function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ideas: [...state.ideas, action.payload] };
    case "delete":
      return {
        ...state,
        ideas: state.ideas.filter(
          (idea) => idea.createdAtExact !== action.payload
        ),
      };
    case "enableEdit":
      return {
        ...state,
        ideas: state.ideas.map((item) => {
          if (item.createdAtExact === action.payload) {
            const updatedItem = {
              ...item,
              editEnabled: true,
            };
            return updatedItem;
          }
          return item;
        }),
      };

    case "sortByDate":
      return {
        ...state,
        ideas: state.ideas.sort((a, b) =>
          a.createdAtExact > b.createdAtExact ? 1 : -1
        ),
      };
    case "sortByTitle":
      return {
        ...state,
        ideas: state.ideas.sort((a, b) => (a.title > b.title ? 1 : -1)),
      };
  }
}