# Electroneum Testnet ETN Faucet

This repository contains a Next.js application that serves as a faucet for Electroneum (ETN) testnet tokens. It allows users to request ETN from the testnet by solving a CAPTCHA and provides a user-friendly interface for developers and testers interacting with the Electroneum testnet.

## Features

- **ETN Testnet Integration**: Connects to the ETN-SC RPC for testnet transactions.
- **Rate Limiting**: Ensures fair usage with Redis-based rate limiting.
- **CAPTCHA Protection**: Uses hCaptcha to prevent abuse.
- **Modern Frontend**: Built with Next.js for a responsive and efficient UI.

## Prerequisites

Before running this application, ensure you have the following:

- **ETN-SC RPC**: A running Electroneum testnet node with RPC access.
- **Redis**: For rate-limiting and session management.
- **hCaptcha Account**: For CAPTCHA verification.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/electroneum/etn-faucet.git
cd etn-faucet
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and set the following variables:

```env
# ETN-SC RPC
RPC_URL=<Your ETN-SC RPC endpoint>

# Faucet Private Key
PRIVATE_KEY=<Your faucet private key>

# Redis Configuration
REDIS_URL=<Your Redis connection URL>

# hCaptcha Configuration
HCAPTCHA_SECRET_KEY=<Your hCaptcha secret key>

# Public Configurations
NEXT_PUBLIC_RATE_LIMIT_COOLDOWN_PERIOD_HOURS=<Rate limit cooldown period in hours>
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=<Your hCaptcha site key>
NEXT_PUBLIC_ETN_AMOUNT=<Amount of ETN to dispense per request>
```

### 4. Run the Application

#### Development

```bash
pnpm dev
```

#### Production

1. Build the application:

   ```bash
   pnpm build
   ```

2. Start the production server:

   ```bash
   pnpm start
   ```

The application will be accessible at `http://localhost:3000`.

## Usage

1. Navigate to the application in your browser.
2. Enter your testnet ETN address.
3. Solve the hCaptcha challenge.
4. Submit the form to receive testnet ETN tokens.

## Deployment

You can deploy this application on any hosting provider that supports Node.js. Popular choices include:

- [Vercel](https://vercel.com/)
- [Heroku](https://www.heroku.com/)
- [AWS](https://aws.amazon.com/)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

### Guidelines

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the awesome React framework.
- [hCaptcha](https://www.hcaptcha.com/) for CAPTCHA services.
- [Redis](https://redis.io/) for caching and rate limiting.

## Questions or Feedback?

Feel free to reach out via [GitHub Issues](https://github.com/electroneum/etn-faucet/issues)!
