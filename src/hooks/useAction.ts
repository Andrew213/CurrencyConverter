import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store';

export default function useAction() {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreators, dispatch);
}
