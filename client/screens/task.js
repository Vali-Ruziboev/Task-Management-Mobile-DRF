import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList, StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";
import TaskCard from "../components/TaskCard";
import AddModal from "../components/AddModal";
import DeleteModal from "../components/DeleteModal";
import { actions, open } from "../features/modal/taskModalSlice";
import { useLogoutMutation } from "../services/auth";
import { update } from "../features/auth/authSlice";

function Task() {
  const { values: data } = useSelector((state) => state.task);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(update(null));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={handleLogout}
        viewStyle={[styles["logout"]]}
        pressableStyle={[styles["logout__pressable"]]}
      >
        <MaterialIcons name="logout" size={24} color="black" />
      </Button>
      <View style={styles.header}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: 900,
          }}
        >
          To Do
        </Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={data}
          renderItem={({ item }) => <TaskCard task={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <StatusBar style="auto" />
      <Button
        onPress={() => dispatch(open({ type: actions.ADD }))}
        viewStyle={[styles.addButtonContainer]}
        pressableStyle={[styles.addButtonInnerContainer]}
        textStyle={[styles.addButtonText]}
      >
        <AntDesign name="plus" size={20} color="white" />
      </Button>
      <AddModal />
      <DeleteModal />
    </View>
  );
}

export default Task;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingTop: 80,
    padding: 25,
    shadowColor: "gray",
    textAlign: "center",
    elevation: 5,
    zIndex: 1,
    borderColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "white",
  },

  body: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },

  addButtonContainer: {
    position: "absolute",
    bottom: 50,
    right: 50,
    borderRadius: 100,
  },
  addButtonInnerContainer: {
    height: 52,
    padding: 4,
    paddingHorizontal: 16,
    borderRadius: 100,
  },

  addButtonText: {
    fontSize: 30,
  },
  logout: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 2,
  },
  logout__pressable: {
    backgroundColor: "transparent",
  },
});
