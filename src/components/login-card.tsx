"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/app/actions";

export default function LoginCard() {
  const [mode, setMode] = useState<'signin'|'signup'>('signin');

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === 'signin' ? 'Sign In' : 'Create account'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={mode === 'signin' ? signIn : signUp} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input name="email" type="email" required />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <Input name="password" type="password" required />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</Button>
            <button
              type="button"
              className="text-sm text-muted-foreground underline"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            >
              {mode === 'signin' ? 'Create an account' : 'Have an account? Sign in'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
