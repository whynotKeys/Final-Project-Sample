"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, User } from "lucide-react"

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "홍길동",
    id: "user123",
    email: "user@example.com",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123",
    detailAddress: "456호",
    zipCode: "12345",
    birthDate: "1990-01-01",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("회원정보 수정:", formData)
    setIsEditing(false)
    // 회원정보 수정 로직 구현
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
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-primary-200 text-primary hover:bg-primary-50 bg-transparent"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-secondary-300 text-secondary-700 hover:bg-secondary-50 bg-transparent"
              >
                <User className="w-4 h-4 mr-2" />
                My Page
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-primary-100 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary-600 px-8 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">회원정보 관리</h1>
            <p className="text-primary-100">개인정보를 안전하게 관리하세요</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-primary-700 font-medium">
                    이름
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12 disabled:bg-primary-50"
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
                    value={formData.id}
                    disabled={true}
                    className="bg-secondary-100 border-secondary-200 text-secondary-700 rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-700 font-medium">
                  이메일
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12 disabled:bg-primary-50"
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12 disabled:bg-primary-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-primary-700 font-medium">
                  우편번호
                </Label>
                <div className="flex space-x-3">
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12 disabled:bg-primary-50"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!isEditing}
                    className="border-secondary-300 text-secondary-700 hover:bg-secondary-50 rounded-xl px-6 bg-transparent"
                  >
                    주소검색
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-primary-700 font-medium">
                  주소
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12 disabled:bg-primary-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="detailAddress" className="text-primary-700 font-medium">
                  상세주소
                </Label>
                <Input
                  id="detailAddress"
                  name="detailAddress"
                  type="text"
                  value={formData.detailAddress}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12 disabled:bg-primary-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-primary-700 font-medium">
                  생년월일
                </Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="border-primary-200 focus:border-primary-400 focus:ring-primary-200 rounded-xl h-12 disabled:bg-primary-50"
                />
              </div>

              <div className="flex space-x-4 pt-6">
                {!isEditing ? (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl h-12 font-semibold shadow-lg"
                  >
                    정보 수정
                  </Button>
                ) : (
                  <>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-secondary-400 to-secondary-600 hover:from-secondary-500 hover:to-secondary-700 text-white rounded-xl h-12 font-semibold shadow-lg"
                    >
                      저장하기
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border-primary-300 text-primary hover:bg-primary-50 rounded-xl h-12 font-semibold"
                    >
                      취소
                    </Button>
                  </>
                )}
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-primary-200">
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1 border-secondary-300 text-secondary-700 hover:bg-secondary-50 rounded-xl h-12 font-semibold bg-transparent"
                >
                  비밀번호 변경
                </Button>
                <Button variant="destructive" className="flex-1 rounded-xl h-12 font-semibold">
                  회원탈퇴
                </Button>
              </div>
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
