
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getSession, upgradeUser } from '@/lib/localAuth';

interface PremiumLockProps {
  isPremium: boolean;
  children: React.ReactNode;
  title?: string;
  description?: string;
  triggerLabel?: string;
}

export function PremiumLock({
  isPremium,
  children,
  title = 'Premium Feature',
  description = 'Upgrade to the Premium plan to access this feature.',
  triggerLabel = 'Upgrade to Unlock',
}: PremiumLockProps) {
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative group">
      {/* Blurred Content */}
      <div className="filter blur-sm select-none pointer-events-none opacity-50 transition-all duration-300">
        {children}
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
        <Card className="p-6 max-w-sm shadow-xl border-[#3960F9]/20 bg-white/95 backdrop-blur-md">
          <div className="mx-auto w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-[#3960F9]" />
          </div>
          <h3 className="text-lg font-semibold text-[#141B34] mb-2">{title}</h3>
          <p className="text-sm text-[#555555] mb-6">{description}</p>
          
          <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
            <DialogTrigger asChild>
              <Button 
                className="w-full text-white border-0 font-semibold"
                style={{
                  background:
                    "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                  boxShadow:
                    "0 1px 2px -1px rgba(9, 6, 63, 0.40), 0 1px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 1px #3960F9",
                }}
              >
                {triggerLabel}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-black/5 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-[#141B34] font-semibold text-xl">Upgrade to Premium</DialogTitle>
                <DialogDescription className="text-[#555555]">
                  Unlock full access to Leegal Nation's powerful business tools.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border p-4 rounded-lg bg-[#EEF3FF] border-[#3960F9]/20">
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#141B34]">Premium Plan</h4>
                      <p className="text-sm text-[#3960F9] font-medium">$299 / one-time</p>
                    </div>
                    <div className="bg-white text-[#3960F9] text-xs px-2 py-1 rounded-full font-bold border border-[#3960F9]/20 shadow-sm">
                      BEST VALUE
                    </div>
                  </div>
                  <ul className="text-sm space-y-3 text-[#555555]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#3960F9]" />
                      Unlimited Document Storage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#3960F9]" />
                      Priority Legal Support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#3960F9]" />
                      Annual Compliance Calendar
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#3960F9]" />
                      Registered Agent Service
                    </li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUpgradeOpen(false)} className="border-black/10 text-[#555555] hover:bg-black/5">
                  Cancel
                </Button>
                <Button 
                  className="text-white border-0 font-semibold"
                  style={{
                    background:
                      "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                    boxShadow:
                      "0 1px 2px -1px rgba(9, 6, 63, 0.40), 0 1px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 1px #3960F9",
                  }}
                  onClick={async () => {
                    const session = await getSession();
                    if (session?.userId) {
                      await upgradeUser(session.userId);
                      alert('Payment Successful! You are now a Premium member.');
                      setIsUpgradeOpen(false);
                      window.location.reload();
                    }
                  }}
                >
                  Confirm Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </div>
  );
}
