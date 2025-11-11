"use client";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useState } from "react";
import { isAxiosError } from "axios";
import { register } from "@/lib/api/clientApi";
import { RegisterData } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "next/dist/server/api-utils";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const userData = Object.fromEntries(formData) as unknown as RegisterData;
      const user = await register(userData);
      if (user) {
         setUser(user);
      router.push("/profile");
      }
     
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
