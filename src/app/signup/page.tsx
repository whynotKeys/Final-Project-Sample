"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
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
    console.log("회원가입 데이터:", formData)
    // 회원가입 로직 구현
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
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-primary-200 text-primary hover:bg-primary-50 bg-transparent"
                >
                  로그인
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-primary-100 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-600 px-8 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">회원가입</h1>
            <p className="text-primary-100">KeyCraft에 오신 것을 환영합니다</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary-700 font-medium">
                  이름
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12"
                  required
                />
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-primary-700 font-medium">
                  비밀번호 확인
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-primary-700 font-medium">
                  전화번호
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="전화번호를 입력하세요"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-700 font-medium">
                  이메일
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl h-12 font-semibold text-lg shadow-lg"
              >
                가입하기
              </Button>
            </form>

            <div className="text-center mt-6">
              <Link href="/login" className="text-secondary-600 hover:text-secondary-700 font-medium hover:underline">
                이미 계정이 있으신가요? 로그인하기
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
