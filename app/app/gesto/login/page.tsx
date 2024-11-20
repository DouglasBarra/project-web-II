'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
 
const LoginPage = () => {
    return (
        <form className="">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">Login Gest' O</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Email" className="w-full" />
                    <Input placeholder="Password" type="password" className="w-full" />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button variant="default" size="default" className="w-full">
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