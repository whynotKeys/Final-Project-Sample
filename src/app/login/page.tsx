"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("로그인 데이터:", formData)
    // 로그인 로직 구현
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} 로그인`)
    // 소셜 로그인 로직 구현
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-primary-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">K</span>
              </div>
              <span className="text-xl font-bold text-primary">KeyCraft</span>
            </Link>
            <div className="space-x-3">
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary-600 text-white">회원가입</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-primary-100 overflow-hidden">
          <div className="bg-gradient-to-r from-secondary-400 to-secondary-600 px-8 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">로그인</h1>
            <p className="text-secondary-100">계정에 로그인하세요</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="id" className="text-primary-700 font-medium">
                  아이디
                </Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-primary-700 font-medium">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-secondary-400 to-secondary-600 hover:from-secondary-500 hover:to-secondary-700 text-white rounded-xl h-12 font-semibold text-lg shadow-lg"
              >
                로그인
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-primary-400">또는</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-4">
              <p className="text-center text-sm text-primary-600 font-medium">소셜 로그인</p>
              <div className="flex justify-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 rounded-full border-2 border-primary-200 hover:border-red-300 hover:bg-red-50 transition-all bg-transparent"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">G</span>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 rounded-full border-2 border-primary-200 hover:border-yellow-300 hover:bg-yellow-50 transition-all bg-transparent"
                  onClick={() => handleSocialLogin("Kakao")}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-yellow-900 text-sm font-bold">K</span>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 rounded-full border-2 border-primary-200 hover:border-green-300 hover:bg-green-50 transition-all bg-transparent"
                  onClick={() => handleSocialLogin("Naver")}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">N</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex justify-between mt-8 text-sm">
              <Link
                href="/forgot-password"
                className="text-secondary-600 hover:text-secondary-700 font-medium hover:underline"
              >
                비밀번호 찾기
              </Link>
              <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-medium hover:underline">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-primary-200">&copy; 2024 KeyCraft. 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  )
}
