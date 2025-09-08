import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, BarChart3 } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="max-w-2xl w-full">
        <Card className="text-center">
          <CardContent className="p-12">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-danger-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">?</span>
                </div>
              </div>
              <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                404
              </h1>
              <h2 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                Page Not Found
              </h2>
            </div>

            {/* Error Message */}
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track with your crypto tracking journey.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button onClick={handleGoHome} size="lg">
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </Button>
              <Button variant="outline" onClick={handleGoBack} size="lg">
                <Search className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Popular Pages */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                Popular Pages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/')}>
                  <CardContent className="p-4 text-left">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-50">
                          Crypto Dashboard
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          View all cryptocurrencies
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/coin/bitcoin')}>
                  <CardContent className="p-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-crypto-bitcoin rounded-full"></div>
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-50">
                          Bitcoin Details
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          View Bitcoin information
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
