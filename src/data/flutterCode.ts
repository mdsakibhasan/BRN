export interface FlutterFile {
  filename: string;
  path: string;
  description: string;
  code: string;
}

export const FLUTTER_CODE_FILES: FlutterFile[] = [
  {
    filename: 'pubspec.yaml',
    path: 'pubspec.yaml',
    description: 'Flutter dependencies including Provider, HTTP, Geolocation, and Animated UI packages',
    code: `name: bangla_ruti_network
description: "Bangla Ruti Network (BRN) - 15-Minute Hot Ruti Delivery in Mirpur 11 & 12"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  # State Management
  provider: ^6.1.2
  # Geolocation & Distance Calculation (2km radius enforcement)
  geolocator: ^11.0.0
  google_maps_flutter: ^2.6.0
  # HTTP & Payment Gateway API Integration
  http: ^1.2.1
  # UI & Animation
  cached_network_image: ^3.3.1
  flutter_animate: ^4.5.0
  intl: ^0.19.0
  google_fonts: ^6.2.1
  lucide_icons: ^0.257.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
`
  },
  {
    filename: 'main.dart',
    path: 'lib/main.dart',
    description: 'Flutter App entry point with Material 3 Theme and MultiProvider for Wallet & Order state',
    code: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'providers/wallet_provider.dart';
import 'providers/cart_provider.dart';
import 'screens/home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => WalletProvider()),
        ChangeNotifierProvider(create: (_) => CartProvider()),
      ],
      child: const BanglaRutiNetworkApp(),
    ),
  );
}

class BanglaRutiNetworkApp extends StatelessWidget {
  const BanglaRutiNetworkApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bangla Ruti Network (BRN)',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFE65100), // Rich Warm Ruti Amber
          primary: const Color(0xFFD84315),
          secondary: const Color(0xFF2E7D32),
          surface: const Color(0xFFFFFBF7),
        ),
        textTheme: GoogleFonts.hindSiliguriTextTheme(
          Theme.of(context).textTheme,
        ),
      ),
      home: const HomeScreen(),
    );
  }
}
`
  },
  {
    filename: 'wallet_provider.dart',
    path: 'lib/providers/wallet_provider.dart',
    description: 'In-app Wallet logic with bKash & Nagad instant recharge and balance verification',
    code: `import 'package:flutter/foundation.dart';

class WalletTransaction {
  final String id;
  final DateTime date;
  final String method; // 'bKash' or 'Nagad'
  final double amount;
  final String trxId;
  final bool isCredit;

  WalletTransaction({
    required this.id,
    required this.date,
    required this.method,
    required this.amount,
    required this.trxId,
    required this.isCredit,
  });
}

class WalletProvider with ChangeNotifier {
  double _balance = 150.0; // Initial promo balance
  final List<WalletTransaction> _transactions = [
    WalletTransaction(
      id: 'TX-101',
      date: DateTime.now().subtract(const Duration(days: 1)),
      method: 'bKash',
      amount: 150.0,
      trxId: 'BKS89342KL',
      isCredit: true,
    ),
  ];

  double get balance => _balance;
  List<WalletTransaction> get transactions => List.unmodifiable(_transactions);

  // Top up balance via bKash or Nagad
  Future<bool> topUpWithGateway({
    required String method,
    required double amount,
    required String phoneNumber,
    required String trxId,
  }) async {
    // Simulate payment gateway API handshake (bKash Checkout / Nagad PGW)
    await Future.delayed(const Duration(seconds: 2));
    
    _balance += amount;
    _transactions.insert(
      0,
      WalletTransaction(
        id: 'TX-\${DateTime.now().millisecondsSinceEpoch}',
        date: DateTime.now(),
        method: method,
        amount: amount,
        trxId: trxId,
        isCredit: true,
      ),
    );
    notifyListeners();
    return true;
  }

  // Deduct order amount from user wallet
  bool deductForOrder(double amount, String orderId) {
    if (_balance >= amount) {
      _balance -= amount;
      _transactions.insert(
        0,
        WalletTransaction(
          id: 'TX-\${DateTime.now().millisecondsSinceEpoch}',
          date: DateTime.now(),
          method: 'BRN Ruti Order #\$orderId',
          amount: amount,
          trxId: 'ORD-\$orderId',
          isCredit: false,
        ),
      );
      notifyListeners();
      return true;
    }
    return false;
  }
}
`
  },
  {
    filename: 'zone_validator.dart',
    path: 'lib/services/zone_validator.dart',
    description: 'Enforces Mirpur 11 & Mirpur 12 2km maximum delivery radius from Central Hub',
    code: `import 'dart:math';

class MirpurZoneValidator {
  // BRN Central Bakery Kitchen Coordinates (Mirpur 11, Avenue 3)
  static const double hubLat = 23.8223;
  static const double hubLng = 90.3654;
  static const double maxRadiusKm = 2.0;

  // Haversine formula to verify user location <= 2.0 km
  static double calculateDistanceKm(double userLat, double userLng) {
    const double earthRadiusKm = 6371.0;
    final dLat = _degToRad(userLat - hubLat);
    final dLng = _degToRad(userLng - hubLng);

    final a = sin(dLat / 2) * sin(dLat / 2) +
        cos(_degToRad(hubLat)) *
            cos(_degToRad(userLat)) *
            sin(dLng / 2) *
            sin(dLng / 2);
    final c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return earthRadiusKm * c;
  }

  static bool isWithinMirpurZone(double userLat, double userLng) {
    final distance = calculateDistanceKm(userLat, userLng);
    return distance <= maxRadiusKm;
  }

  static double _degToRad(double deg) => deg * (pi / 180.0);
}
`
  },
  {
    filename: 'order_screen.dart',
    path: 'lib/screens/order_tracker_screen.dart',
    description: 'Live 15-minute countdown and step progress (Baking -> Insulated Box -> Rider in Mirpur)',
    code: `import 'dart:async';
import 'package:flutter/material.dart';

class OrderTrackerScreen extends StatefulWidget {
  final String orderId;
  const OrderTrackerScreen({super.key, required this.orderId});

  @override
  State<OrderTrackerScreen> createState() => _OrderTrackerScreenState();
}

class _OrderTrackerScreenState extends State<OrderTrackerScreen> {
  int _secondsLeft = 900; // 15 Minutes Guaranteed
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsLeft > 0) {
        setState(() => _secondsLeft--);
      } else {
        timer.cancel();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String get _formattedTime {
    final min = (_secondsLeft ~/ 60).toString().padLeft(2, '0');
    final sec = (_secondsLeft % 60).toString().padLeft(2, '0');
    return '\$min:\$sec';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('১৫ মিনিটে গরম রুটি ট্র্যাকার'),
        backgroundColor: const Color(0xFFD84315),
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            // Timer Card
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFFFFF3E0),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFFFB74D)),
              ),
              child: Column(
                children: [
                  const Text('গ্যারান্টিযুক্ত সর্বোচ্চ ডেলিভারি সময়',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text(_formattedTime,
                      style: const TextStyle(
                          fontSize: 48,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFFD84315))),
                  const Text('তাজা গরম রুটি মিরপুর ১১/১২-এ পথিমধ্যে আছে 🛵💨'),
                ],
              ),
            ),
            const SizedBox(height: 24),
            // Steps
            _buildStepTile(
              title: 'তাওয়াতে রুটি ভাজা সম্পন্ন',
              subtitle: 'লাল আটার ফুলকো রুটি প্রস্তুত',
              isCompleted: true,
            ),
            _buildStepTile(
              title: 'ইনসুলেটেড হট বক্সে প্যাকিং',
              subtitle: 'ধোঁয়া ওঠা গরম রাখার ফয়েল প্যাক',
              isCompleted: true,
            ),
            _buildStepTile(
              title: 'রাইডার রওনা হয়েছেন',
              subtitle: 'মিরপুর ১১ এভিনিউ ৪ হয়ে আপনার ঠিকানায়',
              isCompleted: true,
            ),
            _buildStepTile(
              title: 'ডোরস্টেপ ডেলিভারি (১৫ মিনিট)',
              subtitle: 'গরম অবস্থায় বুঝে নিন',
              isCompleted: false,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepTile({required String title, required String subtitle, required bool isCompleted}) {
    return ListTile(
      leading: CircleAvatar(
        backgroundColor: isCompleted ? Colors.green : Colors.grey.shade300,
        child: Icon(isCompleted ? Icons.check : Icons.access_time, color: Colors.white),
      ),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
      subtitle: Text(subtitle),
    );
  }
}
`
  }
];
