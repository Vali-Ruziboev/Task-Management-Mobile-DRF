import { Provider } from "react-redux";
import { store } from "./app/store";
import Task from "./screens/task";

export default () => {
  return (
    <Provider store={store}>
      <Task />
    </Provider>
  );
};
