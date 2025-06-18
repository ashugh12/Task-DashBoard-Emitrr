import { create } from 'zustand'
import type { Board, Column, Task } from '../types'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'


interface State {
  boards: Record<string, Board>
  columns: Record<string, Column>
  tasks: Record<string, Task>

  createBoard: (name: string) => void
  deleteBoard: (boardId: string) => void
  createColumn: (boardId: string, title: string) => void
  createTask: (columnId: string, task: Omit<Task, 'id'>) => void
  moveTask: (fromColumn: string, toColumn: string, taskId: string, toIndex: number) => void
  reorderTasks: (columnId: string, fromIndex: number, toIndex: number) => void
  deleteTask: (taskId: string) => void
  deleteColumn: (columnId: string) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
}

export const useBoardStore = create<State>()(
  persist(
    (set, get) => ({
      boards: {},
      columns: {},
      tasks: {},

      createBoard: name => {
        const id = uuid()
        set(state => ({
          boards: {
            ...state.boards,
            [id]: { id, name, columnIds: [], createdAt: Date.now() }
          }
        }))
      },

      deleteBoard: (boardId: string) => {
        set(state => {
          const boards = { ...state.boards }
          const columns = { ...state.columns }
          const tasks = { ...state.tasks }
      
          const columnIds = boards[boardId]?.columnIds || []
      
          // Remove tasks in those columns
          columnIds.forEach(colId => {
            state.columns[colId]?.taskIds.forEach(taskId => {
              delete tasks[taskId]
            })
            delete columns[colId]
          })
      
          delete boards[boardId]
      
          return { boards, columns, tasks }
        })
      },
      createColumn: (boardId, title) => {
        const id = uuid()
        const board = get().boards[boardId]
        if (!board) return
        set(state => ({
          columns: {
            ...state.columns,
            [id]: { id, title, taskIds: [] }
          },
          boards: {
            ...state.boards,
            [boardId]: {
              ...board,
              columnIds: [...board.columnIds, id]
            }
          }
        }))
      },

      createTask: (columnId, taskData) => {
        const id = uuid()
        set(state => ({
          tasks: {
            ...state.tasks,
            [id]: { ...taskData, id }
          },
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              taskIds: [...state.columns[columnId].taskIds, id]
            }
          }
        }))
      },

      moveTask: (fromColumn, toColumn, taskId, toIndex) => {
        set(state => {
          const from = state.columns[fromColumn]
          const to = state.columns[toColumn]
          return {
            columns: {
              ...state.columns,
              [fromColumn]: {
                ...from,
                taskIds: from.taskIds.filter(id => id !== taskId)
              },
              [toColumn]: {
                ...to,
                taskIds: [
                  ...to.taskIds.slice(0, toIndex),
                  taskId,
                  ...to.taskIds.slice(toIndex)
                ]
              }
            }
          }
        })
      },

      reorderTasks: (columnId, fromIndex, toIndex) => {
        set(state => {
          const ids = [...state.columns[columnId].taskIds]
          const [moved] = ids.splice(fromIndex, 1)
          ids.splice(toIndex, 0, moved)
          return {
            columns: {
              ...state.columns,
              [columnId]: { ...state.columns[columnId], taskIds: ids }
            }
          }
        })
      },

      deleteTask: id => {
        set(state => {
          const columns = { ...state.columns }
          Object.values(columns).forEach(column => {
            column.taskIds = column.taskIds.filter(tid => tid !== id)
          })
          const tasks = { ...state.tasks }
          delete tasks[id]
          return { tasks, columns }
        })
      },

      deleteColumn: columnId => {
        set(state => {
          const tasks = { ...state.tasks }
          const { taskIds } = state.columns[columnId]
          taskIds.forEach(id => delete tasks[id])

          const columns = { ...state.columns }
          delete columns[columnId]

          const boards = { ...state.boards }
          for (const board of Object.values(boards)) {
            board.columnIds = board.columnIds.filter(cid => cid !== columnId)
          }

          return { tasks, columns, boards }
        })
      },

      updateTask: (id: string, updates: Partial<Task>) => {
        set(state => ({
          tasks: {
            ...state.tasks,
            [id]: {
              ...state.tasks[id],
              ...updates
            }
          }
        }))
      }      
    }),
    { name: 'task-board-storage' }
  )
)