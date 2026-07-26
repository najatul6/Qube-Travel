import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Pricing() {
  const packages = [
    {
      title: 'Essential Wellness',
      price: '$149',
      description: 'Perfect for a monthly reset.',
      features: ['60-minute Custom Massage', 'Access to relaxation lounge', 'Complimentary herbal tea', '10% off retail products'],
      popular: false
    },
    {
      title: 'Qube Signature',
      price: '$249',
      description: 'Our most popular day spa experience.',
      features: ['90-minute Signature Massage', 'Express customized facial', 'Aromatherapy add-on', 'Access to hydrotherapy pools', '15% off retail products'],
      popular: true
    },
    {
      title: 'Ultimate Indulgence',
      price: '$399',
      description: 'A full day of head-to-toe pampering.',
      features: ['90-minute Hot Stone Massage', '60-minute Anti-Aging Facial', 'Spa pedicure & manicure', 'Private suite access with lunch', '20% off retail products'],
      popular: false
    }
  ];

  return (
    <PageTransition>
      <div className="bg-muted py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing & Packages</h1>
        <p className="text-muted-foreground max-w-xl mx-auto px-4">
          Choose from our a la carte services or indulge in our specially curated wellness packages.
        </p>
      </div>

      <div className="container py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <Card key={pkg.title} className={`flex flex-col relative ${pkg.popular ? 'border-primary shadow-lg scale-105 z-10' : ''}`}>
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center flex-1">
                <div className="my-4">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                </div>
                <ul className="space-y-3 text-sm text-left mt-8">
                  {pkg.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={pkg.popular ? 'default' : 'outline'} asChild>
                  <Link to="/book">Select Package</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
