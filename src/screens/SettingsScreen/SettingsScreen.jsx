import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton.jsx";
import { optionsSchema } from "../../logic/optionsSchema.js";
import { useOptionsState } from "../../state/useOptionsState.js";

import styles from "./SettingsScreen.module.css";

function SettingsScreen() {
  const navigate = useNavigate();

  const playerName = useOptionsState((s) => s.playerName);
  const speedMs = useOptionsState((s) => s.speedMs);
  const soundOn = useOptionsState((s) => s.soundOn);
  const setOptions = useOptionsState((s) => s.setOptions);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { playerName, speedMs, soundOn },
    resolver: yupResolver(optionsSchema),
    mode: "onSubmit",
  });

  const submit = (data) => {
    setOptions({
      playerName: data.playerName.trim(),
      speedMs: Number(data.speedMs),
      soundOn: Boolean(data.soundOn),
    });
    navigate("/");
  };

  return (
    <div className={styles.wrap}>
      <h2>Settings</h2>

      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <label className={styles.field}>
          <span>Player name</span>
          <input {...register("playerName")} placeholder="e.g. Alex" />
          {errors.playerName && (
            <span className={styles.err}>{errors.playerName.message}</span>
          )}
        </label>

        <label className={styles.field}>
          <span>Speed (ms)</span>
          <input {...register("speedMs")} type="number" step="50" />
          {errors.speedMs && (
            <span className={styles.err}>{errors.speedMs.message}</span>
          )}
        </label>

        <label className={styles.checkRow}>
          <input type="checkbox" {...register("soundOn")} />
          <span>Sound</span>
        </label>

        <div className={styles.actions}>
          <PrimaryButton type="submit" disabled={isSubmitting}>
            Save
          </PrimaryButton>
          <button type="button" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsScreen;
