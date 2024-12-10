'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { RegisterUser } from "@/services/usuarios";

const RegisterPage = () => {
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); 
    const router = useRouter();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        RegisterUser(name, email, password)
            .then((data) => {
                if (data) {
                    setSuccessMessage('Cadastro realizado com sucesso!'); 
                    setTimeout(() => {
                        router.push('/gesto/login');
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Erro ao registrar o usuário. Tente novamente.");
            });
    };

    return (
        <form onSubmit={onSubmit}>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">Registro Gest' O</CardTitle>
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
                        placeholder="E-mail"
                        className="w-full"/>
                    <Input 
                        type="name"
                        id="name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                        className="w-full"/>
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
                        Registrar
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                        Já tem uma conta?{" "}
                        <Link href="/gesto/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Faça login aqui
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </form>
    );
};

export default RegisterPage;
