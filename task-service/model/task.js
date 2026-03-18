const task = [];

const createTask = (data) => {
    task.push(data);
}



const getAllTasks = () => {

    return task
};

module.exports = { createTask, getAllTasks };