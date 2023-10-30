"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import { QueryDocumentSnapshot } from "firebase/firestore";

import List from "./components/list";
import FirestoreService from "@/services/firestore.service";
import { useState } from "react";
import Privator from "./components/privator";

export default function Home() {
  const [textFilter, setTextFilter] = useState("");

  const [todos] = useCollection(
    FirestoreService.filter<CardItem>(
      "cards",
      "status",
      "==",
      CardItemStatus.todo
    )
  );

  const [doing] = useCollection(
    FirestoreService.filter<CardItem>(
      "cards",
      "status",
      "==",
      CardItemStatus.doing
    )
  );

  const [done] = useCollection(
    FirestoreService.filter<CardItem>(
      "cards",
      "status",
      "==",
      CardItemStatus.done
    )
  );

  const [filed] = useCollection(
    FirestoreService.filter<CardItem>(
      "cards",
      "status",
      "==",
      CardItemStatus.filed
    )
  );

  return (
    <div>
      <div className="flex mt-10">
        <div className="ml-4 mr-4">
          <List
            textFilter={textFilter}
            setTextFilter={setTextFilter}
            cards={todos?.docs as QueryDocumentSnapshot<CardItem>[]}
            title="À fazer"
            status={CardItemStatus.todo}
          ></List>
        </div>
        <div className="flex-1 mr-4">
          <List
            textFilter={textFilter}
            setTextFilter={setTextFilter}
            cards={doing?.docs as QueryDocumentSnapshot<CardItem>[]}
            title="Em desenvolvimento"
            status={CardItemStatus.doing}
          ></List>
        </div>
        <div className="flex-1 mr-4">
          <List
            textFilter={textFilter}
            setTextFilter={setTextFilter}
            cards={done?.docs as QueryDocumentSnapshot<CardItem>[]}
            title="Concluído"
            status={CardItemStatus.done}
          ></List>
        </div>
        <div className="flex-1 mr-4">
          <List
            textFilter={textFilter}
            setTextFilter={setTextFilter}
            cards={filed?.docs as QueryDocumentSnapshot<CardItem>[]}
            title="Arquivados"
            status={CardItemStatus.filed}
          ></List>
        </div>
      </div>
    </div>
  );
}
