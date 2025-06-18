import { useParams } from "react-router-dom"
import { useBoardStore } from "../store/boardStore"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import type { DropResult } from "@hello-pangea/dnd"
import { useState } from "react"
import RichTextEditor from "../components/RichTextEditor"
import { Header } from "./HeaderPage"

const TASKS_PER_PAGE = 5

const BoardDetail = () => {
    const { id } = useParams()
    const {
        boards,
        columns,
        tasks,
        createColumn,
        createTask,
        deleteColumn,
        deleteTask,
        reorderTasks,
        moveTask,
        updateTask
    } = useBoardStore()

    const board = boards[id!]
    const [newColumn, setNewColumn] = useState("")
    const [editColumnId, setEditColumnId] = useState("")
    const [columnTitle, setColumnTitle] = useState("")
    const [columnPage, setColumnPage] = useState<{ [columnId: string]: number }>({})

    const handleDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result
        if (!destination) return

        if (source.droppableId === destination.droppableId) {
            reorderTasks(source.droppableId, source.index, destination.index)
        } else {
            moveTask(source.droppableId, destination.droppableId, draggableId, destination.index)
        }
    }

    if (!board) return <div className="p-4">Board not found</div>

    return (
        <div className="h-screen flex flex-col overflow-hidden p-6 gap-4">
            <Header />
            <div className="flex gap-2">
                <input
                    className="border px-2 py-1 rounded"
                    placeholder="New Column Title"
                    value={newColumn}
                    onChange={(e) => setNewColumn(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={() => {
                        if (newColumn.trim()) {
                            createColumn(board.id, newColumn.trim())
                            setNewColumn("")
                        }
                    }}
                >
                    Add Column
                </button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex items-start gap-6 overflow-x-auto  pt-0">
                    {[...board.columnIds].reverse().map((colId) => {
                        const column = columns[colId]
                        const allTasks = column.taskIds
                        const currentPage = columnPage[colId] || 1
                        const totalPages = Math.ceil(allTasks.length / TASKS_PER_PAGE)

                        const startIndex = (currentPage - 1) * TASKS_PER_PAGE
                        const visibleTasks = allTasks.slice(startIndex, startIndex + TASKS_PER_PAGE)

                        return (
                            <div
                                key={colId}
                                className="bg-gray-100 p-4 rounded shadow transition-all duration-300 min-w-[500px]"
                            >
                                <div className="text-xs text-gray-500 mb-2">
                                    <span className="font-semibold">Column ID:</span> {colId}
                                    <span className="ml-2 font-semibold">Tasks:</span> {column.taskIds.length}
                                </div>

                                <div className="flex justify-between mb-2">
                                    {editColumnId === colId ? (
                                        <div className="flex gap-1">
                                            <input
                                                value={columnTitle}
                                                onChange={(e) => setColumnTitle(e.target.value)}
                                                className="border rounded px-2 py-1"
                                            />
                                            <button
                                                onClick={() => {
                                                    if (columnTitle.trim()) {
                                                        column.title = columnTitle
                                                        setEditColumnId("")
                                                    }
                                                }}
                                                className="text-sm text-blue-600"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="font-bold">{column.title}</h2>
                                            <div className="space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setEditColumnId(colId)
                                                        setColumnTitle(column.title)
                                                    }}
                                                    className="text-blue-500 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteColumn(colId)}
                                                    className="text-red-500 text-sm"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <Droppable droppableId={colId}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="relative flex flex-col gap-2"
                                        >
                                            {visibleTasks.map((taskId, index) => {
                                                const task = tasks[taskId]
                                                return (
                                                    <Draggable draggableId={taskId} index={startIndex + index} key={taskId}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`flex flex-col h-auto p-5 mb-2 gap-4 rounded shadow bg-white transition-all duration-200 ease-in-out transform hover:shadow-md cursor-move ${task.priority === 'high'
                                                                        ? 'border-l-4 border-red-500'
                                                                        : task.priority === 'medium'
                                                                            ? 'border-l-4 border-green-500'
                                                                            : 'border-l-4 border-yellow-500'
                                                                    }`}
                                                            >
                                                                <input
                                                                    className="font-semibold w-full"
                                                                    value={task.title}
                                                                    onChange={(e) => updateTask(task.id, { title: e.target.value })}
                                                                />
                                                                <RichTextEditor
                                                                    value={task.description}
                                                                    onChange={(html) => updateTask(task.id, { description: html })}
                                                                />


                                                                <div className="flex flex-col mt-2 gap-1">
                                                                    <div className="text-xs">
                                                                        <label className="block mb-1 text-[16px]">Assigned to:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="border rounded w-full h-[40px] px-1 py-0.5"
                                                                            value={task.assignedTo}
                                                                            onChange={(e) => updateTask(task.id, { assignedTo: e.target.value })}
                                                                        />
                                                                    </div>
                                                                    <div className="flex gap-10 items-center mt-4
                                ">
                                                                        <div className="text-xs">
                                                                            <label className="block mb-1 text-[16px]">Due Date:</label>
                                                                            <input
                                                                                type="date"
                                                                                className="border rounded px-1 py-0.5"
                                                                                value={task.dueDate}
                                                                                onChange={(e) => updateTask(task.id, { dueDate: e.target.value })}
                                                                            />
                                                                        </div>
                                                                        <div className="text-xs">
                                                                            <label className="block mb-1 text-[16px]">Priority:</label>
                                                                            <select
                                                                                className="border rounded w-full px-1 py-0.5"
                                                                                value={task.priority}
                                                                                onChange={(e) => updateTask(task.id, {
                                                                                    priority: e.target.value as 'high' | 'medium' | 'low'
                                                                                })}
                                                                            >
                                                                                <option value="high">High (🔥)</option>
                                                                                <option value="medium">Medium (🟢)</option>
                                                                                <option value="low">Low (🌕)</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => deleteTask(task.id)}
                                                                    className=" text-white text-xs mt-2 bg-red-600 w-[100px] h-[30px] rounded hover:bg-red-300 hover:text-gray-500 transition-colors duration-200"
                                                                >
                                                                    Delete Task
                                                                </button>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                {columns[colId].taskIds.length > 5 &&
                                    <div className="flex justify-between items-center mt-2 text-xs">
                                        <button
                                            onClick={() =>
                                                setColumnPage((prev) => ({
                                                    ...prev,
                                                    [colId]: Math.max((prev[colId] || 1) - 1, 1)
                                                }))
                                            }
                                            disabled={currentPage === 1}
                                            className="text-blue-500 disabled:text-gray-400"
                                        >
                                            ⬅ Prev
                                        </button>
                                        <span>Page {currentPage} / {totalPages}</span>
                                        <button
                                            onClick={() =>
                                                setColumnPage((prev) => ({
                                                    ...prev,
                                                    [colId]: Math.min((prev[colId] || 1) + 1, totalPages)
                                                }))
                                            }
                                            disabled={currentPage === totalPages}
                                            className="text-blue-500 disabled:text-gray-400"
                                        >
                                            Next ➡
                                        </button>
                                    </div>}

                                <button
                                    onClick={() =>
                                        createTask(colId, {
                                            title: "New Task",
                                            description: "",
                                            createdBy: "Ashutosh",
                                            assignedTo: "Team",
                                            priority: "medium",
                                            dueDate: new Date().toISOString().slice(0, 10)
                                        })
                                    }
                                    className="text-blue-500 text-sm mt-2"
                                >
                                    + Add Task
                                </button>
                            </div>
                        )
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}

export default BoardDetail
