/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "RCTOneSignal.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "CodePush.h"

@implementation AppDelegate

@synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

#ifdef DEBUG
  NSLog(@" DEBUG MODE");
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
  NSString *CodePushDeploymentKey = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CodePushDeploymentKey"];
  NSLog(@"CodePushDeploymentKey : %@", CodePushDeploymentKey);
  #ifdef TEST
    NSLog(@" STAGING MODE");
  #else
    NSLog(@"PRODUCTION MODE");
  #endif
  jsCodeLocation = [CodePush bundleURL];
#endif
  

  

  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"bimbot"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:0.4745 green:0.9412 blue:0.8 alpha:1];
  rootView.loadingViewFadeDelay = 0.0;
  rootView.loadingViewFadeDuration = 0.25;
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions                                                         appId:@"633748e4-b22a-4b69-b61e-f3a04ef1a999"];

  return YES;
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification {
  [RCTOneSignal didReceiveRemoteNotification:notification];
}
@end
