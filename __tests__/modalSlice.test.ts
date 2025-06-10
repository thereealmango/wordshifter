import { modalSlice, openModal } from '../src/store/modal/modalSlice';

describe('modalSlice', () => {
  it('sets state.id to 0 when opened with id 0', () => {
    const initialState = modalSlice.getInitialState();
    const nextState = modalSlice.reducer(
      initialState,
      openModal({ show: true, contentName: '', id: 0 })
    );
    expect(nextState.id).toBe(0);
  });

  it('clears state.id when closed', () => {
    const initialState = { ...modalSlice.getInitialState(), id: 5 };
    const nextState = modalSlice.reducer(
      initialState,
      openModal({ show: false, contentName: '' })
    );
    expect(nextState.id).toBeUndefined();
  });
});
