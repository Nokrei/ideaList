export const initialState = { ideas: [] };

export default function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ideas: [...state.ideas, action.payload] };

    case "delete":
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.createdAt !== action.payload),
      };

    case "enableEdit":
      return {
        ...state,
        ideas: state.ideas.map((item) => {
          if (item.createdAt === action.payload) {
            const updatedItem = {
              ...item,
              editEnabled: true,
            };
            return updatedItem;
          }
          return item;
        }),
      };

    case "changeDescription":
      return {
        ...state,
        ideas: state.ideas.map((item) => {
          if (item.createdAt === action.payload) {
            const updatedItem = {
              ...item,
              newDescription: action.payload.target.value,
            };
            return updatedItem;
          }
          return item;
        }),
      };

    case "saveNewDescription":
      return {
        ...state,
        ideas: state.ideas.map((item) => {
          if (item.createdAt === action.payload.id) {
            const updatedItem = {
              ...item,
              description: action.payload.newDescription,
              editEnabled: false,
              updatedAt: Date.now(),
            };
            return updatedItem;
          }
          return item;
        }),
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
