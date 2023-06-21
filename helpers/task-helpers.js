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
    /* Returns 1 if no task is present else finds max ID adds 1 to it and returns */
    if (tasks.length === 0) return 1 
    return Number(tasks.reduce((prev, current) => (prev.ID > current.ID) ? prev : current).ID) + 1
}

const filterTaskById = (tasks, id) => tasks.find(task => task.ID === id)

const insertUpdatedTaskToTasklist = (tasks, updatedTaskInput, taskIdToBeUpdated) => { 
    /* Loops through the tasks and replaces the task to be updated with the updated task input */

    // ID and created-at explicitly set as it's not provided as input
    const updatedTaskData = tasks.map((task) => task.ID === taskIdToBeUpdated ? 
    {...updatedTaskInput, "ID": taskIdToBeUpdated, "created-at": task['created-at']} : task) 
    return { tasks: updatedTaskData }
}

module.exports = { sortAndFilterData, setTaskID, filterTaskById, insertUpdatedTaskToTasklist }