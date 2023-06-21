const sortAndFilterData = (sort, isCompleted, data) => {
    let filteredData = data
    if (isCompleted) {
        filteredData = filteredData.filter((task) => task.isCompleted === isCompleted) 
    }
    if (sort === 'created-at-asc') {
        filteredData = filteredData.sort((a,b) => new Date(a['created-at']) - new Date(b['created-at']))
    } else if (sort === 'created-at-desc') {
        filteredData = filteredData.sort((a,b) => new Date(b['created-at']) - new Date(a['created-at']))
    }
    return filteredData
}

const setTaskID = (tasks) => {
    if (tasks.length === 0) return + 1 
    return Number(tasks.reduce((prev, current) => (prev.ID > current.ID) ? prev : current).ID) + 1
}

module.exports = { sortAndFilterData, setTaskID }