import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter,
  LoadingSpinner,
  Skeleton,
  SkeletonCard,
  SkeletonList,
  SkeletonTable,
  SkeletonChart,
  SkeletonAvatar,
  Badge,
  PercentageBadge,
  PriceChangeBadge,
  StatusBadge,
  RankBadge
} from './index';
import { Star, Heart, Share, Download, Settings, User, Bell } from 'lucide-react';

export function UIComponentsExample() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-8 space-y-12 bg-neutral-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
          UI Components Showcase
        </h1>

        {/* Button Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
            Buttons
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Icon Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="icon" size="sm">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button variant="icon" size="md">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="icon" size="lg">
                    <Share className="w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Card Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
            Cards
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default" hover>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-400">
                  This is a default card with hover effects.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-400">
                  This card has enhanced shadows for depth.
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-400">
                  This card has interactive hover effects with scaling.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badge Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
            Badges
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Percentage Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <PercentageBadge value={5.2} />
                  <PercentageBadge value={-3.1} />
                  <PercentageBadge value={0} />
                  <PriceChangeBadge value={1250.50} />
                  <PriceChangeBadge value={-89.25} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status & Rank Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="active" />
                  <StatusBadge status="pending" />
                  <StatusBadge status="failed" />
                  <RankBadge rank={1} />
                  <RankBadge rank={15} />
                  <RankBadge rank={150} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Loading States */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
            Loading States
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Loading Spinners</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                  <LoadingSpinner size="xl" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loading Button</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  isLoading={isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 2000);
                  }}
                >
                  {isLoading ? 'Loading...' : 'Click to Load'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Basic Skeleton</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton width="100%" height="1rem" />
                <Skeleton width="75%" height="1rem" />
                <Skeleton width="50%" height="1rem" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skeleton Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
            Skeleton Loaders
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skeleton Card</CardTitle>
              </CardHeader>
              <CardContent>
                <SkeletonCard />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton List</CardTitle>
              </CardHeader>
              <CardContent>
                <SkeletonList items={3} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton Table</CardTitle>
              </CardHeader>
              <CardContent>
                <SkeletonTable rows={4} columns={3} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <SkeletonChart />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Real-world Example */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
            Real-world Example
          </h2>
          
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SkeletonAvatar size="lg" />
                  <div>
                    <CardTitle>Bitcoin (BTC)</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <RankBadge rank={1} />
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="icon" size="sm">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button variant="icon" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                    Current Price
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                    $43,250.00
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <PercentageBadge value={2.5} />
                    <PriceChangeBadge value={1050.25} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                    Market Cap
                  </p>
                  <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                    $847.2B
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                    24h Volume
                  </p>
                  <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                    $28.5B
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="primary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
}
