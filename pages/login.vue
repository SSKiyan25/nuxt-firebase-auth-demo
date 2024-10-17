<template>
  <div class="h-screen w-full">
    <div class="pt-20 sm:pt-0 lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Sign in your account</h1>
          <p class="text-sm text-muted-foreground">Enter your email and password to proceed</p>
        </div>
        <div>
          <form @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-8">
              <UiVeeInput
                icon="lucide:user"
                name="email"
                type="email "
                label="Email"
                placeholder="jadeDOST@gmail.com"
              />
              <UiVeeInput
                icon="lucide:lock"
                name="password"
                type="password"
                label="Password"
                placeholder="********"
              />
              <UiButton type="submit" size="lg" class="w-full"> Sign in </UiButton>
            </fieldset>
            <div class="pt-4">
              <UiDivider label="or continue with" class="pb-4" />
              <UiButton @click="signInWithGoogle" type="button" class="w-full" variant="outline">
                <Icon name="logos:google-icon" /> Sign in with Google
              </UiButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { googleAuthProvider } from "~/composables/auth/useGoogle";
  import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

  definePageMeta({
    layout: "no-nav",
  });

  const auth = useFirebaseAuth();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(LoginSchema),
  });

  const submit = handleSubmit(async (values) => {
    const loading = useSonner.loading("Loading...", {
      description: "Signed in Sucessfully!",
    });

    try {
      await signInWithEmailAndPassword(auth!, values.email, values.password);
      useSonner.success("Welcome back!", { id: loading });
      return navigateTo("/", { replace: true });
    } catch (error: any) {
      console.error(error.message);
      useSonner.error(error.message, { id: loading });
    }
  });

  const signInWithGoogle = async () => {
    const loading = useSonner.loading("Loading...", {
      description: "Signed in Sucessfully!",
    });

    try {
      await signInWithPopup(auth!, googleAuthProvider);
      useSonner.success("Signing In", {
        id: loading,
      });

      return navigateTo("/", { replace: true });
    } catch (error: any) {
      useSonner.error(error.message, { id: loading });
    }
  };
</script>

<style></style>
