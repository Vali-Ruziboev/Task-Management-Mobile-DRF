import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useLoginMutation } from "../services/auth";
import { useDispatch } from "react-redux";
import { update } from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const handleLogin = async () => {
    if (!form.password || !form.username) {
      return setErrors({
        username: form.username ? "" : "Username is required",
        password: form.password ? "" : "Password is required",
      });
    }

    const res = await login({
      username: form.username,
      password: form.password,
    });

    if (res.error) {
      return setErrors({
        username: "Incorrect username or password",
        password: "Incorrect username or password",
      });
    }
    dispatch(update(res.data));
  };

  return (
    <View style={styles["container"]}>
      <Card style={styles["card"]}>
        <TextInput
          value={form.username}
          outlineStyle={
            errors.username ? styles["errorInputBorder"] : styles["inputBorder"]
          }
          mode="outlined"
          onChangeText={(username) => {
            setErrors((curr) => ({ ...curr, username: "" }));
            setForm((curr) => ({ ...curr, username }));
          }}
          style={styles["input"]}
          error={errors.username}
          label="Username"
        />
        {errors.username && (
          <Text style={styles["error"]}>- {errors.username}</Text>
        )}
        <TextInput
          mode="outlined"
          value={form.password}
          outlineStyle={
            errors.password ? styles["errorInputBorder"] : styles["inputBorder"]
          }
          onChangeText={(password) => {
            setErrors((curr) => ({ ...curr, password: "" }));
            setForm((curr) => ({ ...curr, password }));
          }}
          secureTextEntry={true}
          style={styles["input"]}
          label="Password"
        />
        {errors.password && (
          <Text style={styles["error"]}>- {errors.password}</Text>
        )}
        <Button
          loading={isLoading}
          disabled={isLoading}
          onPressOut={handleLogin}
          style={styles["button"]}
          mode="contained"
        >
          Login
        </Button>
      </Card>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 5,
  },
  inputOutline: {
    borderColor: "transparent",
  },
  inputBorder: {
    borderColor: "transparent",
    borderBottomColor: "rgb(0, 95, 175)",
  },
  errorInputBorder: {
    borderColor: "transparent",
    borderBottomColor: "red",
  },
  error: {
    color: "red",
  },
  button: {
    marginTop: 5,
  },
});
