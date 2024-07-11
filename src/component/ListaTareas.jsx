import { useReducer } from "react";
import { useForm } from "../hooks/useForm";

const initialState = [
  {
    id: new Date().getDate(),
    tarea: "explicar Reducer",
    finalizando: false,
  },
];

const tareaReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "[TAREAS] Agregar Tareas":
      return [...state, action.payload];
    case "[TAREAS] Finalizar Tarea":
      return state.map((tarea) => {
        if (tarea.id === action.payload) {
          return {
            ...tarea,
            finalizando: !tarea.finalizando,
          };
        }
        return tarea;
      });
    //return [...state, action.payload];

    case "[TAREAS] Eliminar Tarea":
      return state.filter((tarea) => tarea.id !== action.payload);
    //return [...state, action.payload];

    case "[TAREAS] Borrar Tareas":
      return [];
    default:
      return state;
  }
};

export const ListaTareas = () => {
  const [tareasState, dispatch] = useReducer(tareaReducer, initialState);

  const { tarea, formState, onInputChange } = useForm({ tarea: "" });
  const agregarTarea = (event) => {
    event.preventDefault();
    if (formState.tarea == "") return;

    const tarea = {
      id: new Date().getTime(),
      tarea: formState.tarea,
      finalizado: false,
    };
    const action = {
      type: "[TAREAS] Agregar Tareas",
      payload: tarea,
    };
    dispatch(action);
  };
  const finalizarTarea = (id) => {
    const action = {
      type: "[TAREAS] Finalizr Tarea",
      payload: id,
    };
    dispatch(action);
  };

  const eliminarTarea = ({ id }) => {
    const action = {
      type: "[TAREAS] Eliminar Tarea",
      payload: id,
    };
    dispatch(action);
  };
  const reset = () => {
    const action = {
      type: "[TAREAS] Borrar Tareas",
      payload: "",
    };
    dispatch(action);
  };

  return (
    <>
      <form onSubmit={agregarTarea}>
        <div className="form-group">
          <label htmlFor="tarea">Ingresa nueva Tarea</label>
          <input
            type="text"
            className="form-control"
            name="tarea"
            placeholder="Ingresa Tarea"
            value={tarea}
            onChange={onInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="button" className="btn btn-danger" onClick={reset}>
          Reset
        </button>
      </form>
      <hr />
      <ul className="list-group">
        {tareasState.map((item) => {
          return (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between">
              <span>{item.tarea}</span>
              <div>
                <input
                  type="checkbox"
                  value={item.finalizado}
                  onChange={() => finalizarTarea(item)}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarTarea(item)}>
                  Borrar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
