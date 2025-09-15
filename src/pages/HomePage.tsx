import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { 
  DocumentTextIcon, 
  UserIcon, 
  CogIcon,
  ChartBarIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const { isLoggedIn, username } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">DevLog</h1>
          <p className="text-xl text-gray-600 mb-8">개발자들을 위한 블로그 플랫폼</p>
          
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              로그인
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 웰컴 섹션 */}
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            안녕하세요, <span className="text-blue-600">{username}</span>님! 👋
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            DevLog에 오신 것을 환영합니다. 오늘도 좋은 하루 되세요!
          </p>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 대시보드 카드 */}
          <Link
            to="/dashboard"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <ChartBarIcon className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">대시보드</h3>
            </div>
            <p className="text-gray-600">
              게시글을 확인하고 관리하세요
            </p>
          </Link>

          {/* 새 글 작성 카드 */}
          <Link
            to="/posts/create"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <PlusIcon className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">새 글 작성</h3>
            </div>
            <p className="text-gray-600">
              새로운 게시글을 작성해보세요
            </p>
          </Link>

          {/* 프로필 카드 */}
          <Link
            to="/profile"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <UserIcon className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">내 프로필</h3>
            </div>
            <p className="text-gray-600">
              프로필 정보를 확인하고 수정하세요
            </p>
          </Link>

          {/* 설정 카드 */}
          <Link
            to="/settings"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <CogIcon className="w-8 h-8 text-gray-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">설정</h3>
            </div>
            <p className="text-gray-600">
              계정 설정을 관리하세요
            </p>
          </Link>

          {/* 프로젝트 카드 */}
          <Link
            to="/projects"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="w-8 h-8 text-orange-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">프로젝트</h3>
            </div>
            <p className="text-gray-600">
              프로젝트를 확인하고 관리하세요
            </p>
          </Link>

          {/* 통계 카드 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="w-8 h-8 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">통계</h3>
            </div>
            <p className="text-gray-600">
              활동 통계를 확인하세요
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-500">작성한 글</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-gray-500">받은 좋아요</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}