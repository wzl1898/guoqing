export const getProjectByKey = state => (key) => state.projects[key]
export const tabArray = state => Object.entries(state.projects || {}).map((val) => val[1])
