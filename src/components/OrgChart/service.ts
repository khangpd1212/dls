import { Subject } from 'rxjs';

const subject1 = new Subject<{ draggedNodeId: string | number }>();
const subject2 = new Subject<{ selectedNodeId: string | number }>();

export const dragNodeService = {
  sendDragInfo: (id) => subject1.next({ draggedNodeId: id }),
  clearDragInfo: () => subject1.next(undefined),
  getDragInfo: () => subject1.asObservable(),
};

export const selectNodeService = {
  sendSelectedNodeInfo: (id) => subject2.next({ selectedNodeId: id }),
  clearSelectedNodeInfo: () => subject2.next(undefined),
  getSelectedNodeInfo: () => subject2.asObservable(),
};
