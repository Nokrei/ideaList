export const initialState = { ideas: [] };

export const sortIdeas = (ideas, property, isDescending) => {
  if (!Array.isArray(ideas)) return [];

  return [...ideas].sort((a, b) => {
    if (a[property] > b[property]) return isDescending ? -1 : 1;
    if (a[property] < b[property]) return isDescending ? 1 : -1;

    return 0;
  });
};

export const addIdea = (ideas, newIdea) => {
  return [...ideas, newIdea];
};

export default function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ideas: addIdea(state.ideas, action.newIdea) };

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
        ideas: sortIdeas(state.ideas, "createdAt"),
      };

    case "sortByTitle":
      return {
        ...state,
        ideas: sortIdeas(state.ideas, "title"),
      };
  }
}
