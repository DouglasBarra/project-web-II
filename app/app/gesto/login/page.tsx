'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/usuarios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser(email, password)
            .then((data) => {
                if (data) {
                    setError(null)
                    setSuccessMessage('Login realizado com sucesso!');
                    setTimeout(() => {
                        router.push('/gesto/dashboard');
                    }, 2000);
                } else {
                    setError('Usuario ou senha incorreta!')
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Erro no login!!!");
            });
    }

    return (
        <form onSubmit={onSubmit}>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">Login Gest' O</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {successMessage && (
                        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
                            {successMessage}
                        </div>
                    )}
                    {error && (
                        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
                            {error}
                        </div>
                    )}
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        required
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="Email"
                        className="w-full"
                    />
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        className="w-full" />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" variant="default" size="default" className="w-full">
                        Sign in
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                        Não tem uma conta?{" "}
                        <Link href="/gesto/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Registre-se aqui
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </form>
    )
}

export default LoginPage;