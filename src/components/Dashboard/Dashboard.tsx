import React from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import Card from "../../components/Card/Card";
import S from "./Dashboard.module.scss";
import useStore, { ZState } from "../../store";

const Dashboard = () => {
  const { favorites, setFavorites } = useStore((state: ZState) => state);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedFavorites = Array.from(favorites);
    const [reorderedItem] = updatedFavorites.splice(result.source.index, 1);
    updatedFavorites.splice(result.destination.index, 0, reorderedItem);
    setFavorites(updatedFavorites);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={S.droppable}>
            {favorites.map((favorite, index) => (
              <Draggable key={favorite.id} draggableId={favorite.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card card={favorite} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dashboard;
