import Image from "next/image";
import AuthForm from "../components/auth/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          width={48}
          height={48}
          className="mx-auto w-auto"
          src="/images/logo.png"
          alt="Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Acesse sua conta
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
