export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  createdBy: string
  assignedTo: string
  priority: Priority
  dueDate: string
}


export type Column = {
  id: string
  title: string
  taskIds: string[]
}


export type Board = {
  id: string
  name: string
  columnIds: string[]
  createdAt: number
}
