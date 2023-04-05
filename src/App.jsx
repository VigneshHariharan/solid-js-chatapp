import styles from "./App.module.css";
import { createSignal, onMount, For, onCleanup } from "solid-js";
import Navbar from "./components/Navbar";
import { DataStore, Amplify, Predicates } from "aws-amplify";
import { MessageObject } from "./models";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);
DataStore.configure({
  syncPageSize: 10,
  maxRecordsToSync: 10,
});

const updateFirstThenWait = (callback, time = 300) => {
  let timeout = 0;
  let isUpdated = false;
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (!isUpdated) {
      callback.apply(this, args);
      isUpdated = true;
    }
    timeout = setTimeout(function () {
      isUpdated = false;
    }, time);
  };
};

function App() {
  const [getMessages, setMessages] = createSignal([]);
  let messageContainerRef = null;

  let subscription;

  const updateUI = updateFirstThenWait((items) => {
    console.log("udpateUI", items);
    setMessages(items);
    if (messageContainerRef) {
      console.log("messageContainerRef", { messageContainerRef });
      messageContainerRef.scrollIntoView({ behaviour: "smooth", block: "end" });
    }
  });

  onMount(async () => {
    await DataStore.clear();
    subscription = DataStore.observeQuery(
      MessageObject,
      Predicates.ALL
    ).subscribe({
      next: (subscriptionObj) => {
        console.log("subscriptionObj", subscriptionObj);
        if (subscriptionObj.isSynced) {
          updateUI(subscriptionObj.items);
        }
      },
    });
  });

  onCleanup(() => {
    if (subscription) {
      console.log("unsubscribe");
      subscription.unsubscribe();
    }
  });

  const updateMessage = async (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;
      await DataStore.save(
        new MessageObject({
          message,
        })
      );
      event.target.value = "";
    }
  };

  return (
    <div class={styles.App}>
      <Navbar />
      <div class={styles.messagesContainer} ref={messageContainerRef}>
        <For each={getMessages()}>
          {(item) => (
            <div class={styles.message}>
              <p>{item.message}</p>
            </div>
          )}
        </For>
      </div>

      <div class={styles.messageCreator}>
        <input
          onKeyDown={updateMessage}
          placeholder="enter messages"
          autofocus
        ></input>
      </div>
    </div>
  );
}

export default App;
