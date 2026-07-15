# Article Management Backend

Backend API dùng để quản lý:

- Company
- Domain
- Keyword
- Sub-keyword
- Article

Dự án được xây dựng bằng NestJS, Fastify và MongoDB theo kiến trúc Modular Monolith kết hợp Clean Architecture.

---

## Tech Stack

### Core

- Node.js
- TypeScript
- NestJS

### HTTP Server

- Fastify
- `@nestjs/platform-fastify`

### Database

- MongoDB
- Mongoose
- `@nestjs/mongoose`

### API Documentation

- Swagger
- OpenAPI
- `@nestjs/swagger`

### Configuration

- `@nestjs/config`

### Validation

- `class-validator`
- `class-transformer`

### Architecture

- Modular Monolith
- Feature-first Architecture
- Simplified Clean Architecture
- SOLID Principles
- Dependency Injection
- Repository Pattern

---

## System Architecture

Mỗi business feature là một NestJS module độc lập với cấu trúc phẳng:

```text
Controller → Service → Repository Interface
                            ↑
                 Mongoose Repository
```

### Controller

Nhận HTTP request, validate DTO, gọi service và trả response.

### Service

Điều phối nghiệp vụ của feature và chỉ làm việc với repository abstraction. Service không inject Mongoose Model hoặc truy cập MongoDB trực tiếp.

### Interface

Mỗi module có một file `module-name.interface.ts` chứa kiểu dữ liệu và repository abstraction của riêng feature đó. File này không phụ thuộc NestJS hoặc Mongoose.

### Infrastructure

Mongoose schema, mapper, repository implementation và kết nối database nằm trong `src/infrastructure`.

---

## Dependency Rule

```text
Controller ─────► Service ─────► Repository Interface
                                        ▲
Infrastructure Repository ──────────────┘
```

Các quy tắc bắt buộc:

```text
Controller không truy cập MongoDB.

Service không inject Mongoose Model.

File interface không import NestJS hoặc Mongoose.

Repository interface nằm trong feature module.

Mongoose repository nằm trong Infrastructure.

Module chịu trách nhiệm liên kết interface với implementation.
```

---

## Main Modules

Dự án gồm các module nghiệp vụ:

```text
company
domain
keyword
sub-keyword
article
```

### Company

Quản lý thông tin công ty.

### Domain

Quản lý các website hoặc domain thuộc công ty.

### Keyword

Quản lý từ khóa chính thuộc một domain.

### Sub-keyword

Quản lý từ khóa phụ thuộc một keyword.

### Article

Quản lý nội dung bài viết và các liên kết với company, domain, keyword và sub-keyword.

---

## Data Relationships

```text
Company
   │
   └── Domain
          │
          └── Keyword
                 │
                 └── SubKeyword

Article
   ├── companyId
   ├── domainId
   ├── keywordId
   └── subKeywordId
```

Quan hệ tổng quát:

- Một Company có nhiều Domain.
- Một Domain thuộc một Company.
- Một Domain có nhiều Keyword.
- Một Keyword thuộc một Domain.
- Một Keyword có nhiều SubKeyword.
- Một SubKeyword thuộc một Keyword.
- Một Article thuộc một Company và một Domain.
- Một Article liên kết với Keyword và có thể có SubKeyword.

Các quan hệ được lưu bằng MongoDB `ObjectId`.

---

## Project Structure

```text
src/
├── main.ts
├── app.module.ts
│
├── config/
│   └── env.validation.ts
│
├── infrastructure/
│   ├── database/
│   │   ├── database.module.ts
│   │   └── mongoose.config.ts
│   └── persistence/
│       └── mongoose/
│           ├── module-name.schema.ts
│           ├── module-name.mapper.ts
│           └── mongoose-module-name.repository.ts
│
├── common/
│   ├── constants/
│   ├── dto/
│   ├── errors/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   ├── types/
│   └── utils/
│
└── modules/
    ├── company/
    ├── domain/
    ├── keyword/
    ├── sub-keyword/
    └── article/
```

---

## Module Structure

Mỗi business module sử dụng cấu trúc:

```text
module-name/
├── dto/
│   ├── create-module-name.dto.ts
│   └── update-module-name.dto.ts
├── module-name.controller.ts
├── module-name.interface.ts
├── module-name.module.ts
└── module-name.service.ts
```

Mỗi `module-name.module.ts` khai báo controller, service, Mongoose schema và liên kết repository token với implementation. Provider được Nest đóng gói trong module theo mặc định; chỉ thêm `exports` khi module khác thực sự cần dùng provider đó. `AppModule` chỉ import các feature module để tạo application graph.

---

## Common Directory

Thư mục `common` chỉ chứa thành phần dùng chung cho nhiều module:

```text
common/
├── constants/
├── dto/
├── errors/
├── filters/
├── interceptors/
├── pipes/
├── types/
└── utils/
```

Ví dụ:

- DTO phân trang.
- Pipe kiểm tra MongoDB ObjectId.
- Global exception filter.
- Response interceptor.
- Kiểu dữ liệu phân trang.
- Hàm tạo slug.
- Error nền tảng.

`common` không được chứa business logic riêng của Company, Domain, Keyword hoặc Article.

---

## SOLID Principles

### Single Responsibility Principle

Mỗi thành phần chỉ có một trách nhiệm:

```text
Controller  → xử lý HTTP
Service     → điều phối nghiệp vụ của feature
Interface   → định nghĩa dữ liệu và abstraction
Repository  → truy cập dữ liệu
Mapper      → chuyển đổi dữ liệu
```

### Open/Closed Principle

Service phụ thuộc repository abstraction, vì vậy có thể thay đổi cách lưu dữ liệu mà không sửa business logic.

### Liskov Substitution Principle

Các repository implementation phải có thể thay thế lẫn nhau:

```text
MongooseCompanyRepository
InMemoryCompanyRepository
PostgresCompanyRepository
```

### Interface Segregation Principle

Mỗi module có repository interface riêng, chỉ khai báo các phương thức mà module thực sự cần.

### Dependency Inversion Principle

Service phụ thuộc abstraction thay vì phụ thuộc trực tiếp Mongoose:

```text
Service
   ↓
Repository Interface
   ↑
Mongoose Repository
```

---

## Installation

```bash
npm install
```

---

## Environment Variables

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cấu hình mẫu:

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=mongodb://127.0.0.1:27017/article_management
MONGODB_MAX_POOL_SIZE=10
MONGODB_MIN_POOL_SIZE=1

CORS_ORIGINS=http://localhost:5173
```

Không commit file `.env` lên Git.

`MONGODB_URI` là nguồn cấu hình duy nhất cho địa chỉ kết nối và database name. `DatabaseModule` dùng `MongooseModule.forRootAsync()` cùng `ConfigService.getOrThrow()`; cấu hình giới hạn thời gian chọn server ở 5 giây, retry tối đa 3 lần và chỉ tự tạo index ngoài production. Pool mặc định từ 1 đến 10 connection và có thể điều chỉnh bằng hai biến môi trường trên.

### MongoDB local

Máy phát triển cần có MongoDB lắng nghe tại `127.0.0.1:27017`, hoặc thay `MONGODB_URI` bằng URI phù hợp trong file `.env` cục bộ. Repository hiện chưa kèm Docker Compose vì Docker CLI không có trong môi trường thiết lập; không đưa credential production vào source code.

Nếu MongoDB không chạy, ứng dụng dừng khởi động sau số lần retry hữu hạn và log thông báo kết nối thất bại mà không in connection string. Hãy khởi động MongoDB, kiểm tra `MONGODB_URI`, rồi chạy lại backend.

### MongoDB persistence structure

Kết nối dùng chung được quản lý tại `src/infrastructure/database`. Repository abstraction nằm trong file interface của từng feature; toàn bộ chi tiết Mongoose nằm ngoài `modules`:

```text
modules/module-name/module-name.interface.ts                  Repository abstraction
infrastructure/persistence/mongoose/module-name.schema.ts     Mongoose schema
infrastructure/persistence/mongoose/module-name.mapper.ts     Document ↔ interface
infrastructure/persistence/mongoose/mongoose-module-name.repository.ts
```

Schema sử dụng timestamps, không lưu `__v`, và giữ `ObjectId` trong persistence trong khi service/HTTP sử dụng ID dạng string. Các lỗi duplicate key, validation, cast ObjectId và document not found được chuyển thành HTTP response an toàn bởi global exception filter.

---

## Running the Application

Chạy development:

```bash
npm run start:dev
```

Chạy production:

```bash
npm run build
npm run start:prod
```

---

## API URL

```text
http://localhost:3000/api/v1
```

---

## Swagger Documentation

```text
http://localhost:3000/api/docs
```

Swagger cung cấp tài liệu cho các nhóm API:

- Company
- Domain
- Keyword
- Sub-keyword
- Article

---

## API Endpoints

### Company

```text
POST   /api/v1/companies
GET    /api/v1/companies
GET    /api/v1/companies/:id
PATCH  /api/v1/companies/:id
DELETE /api/v1/companies/:id
```

### Domain

```text
POST   /api/v1/domains
GET    /api/v1/domains
GET    /api/v1/domains/:id
PATCH  /api/v1/domains/:id
DELETE /api/v1/domains/:id
```

### Keyword

```text
POST   /api/v1/keywords
GET    /api/v1/keywords
GET    /api/v1/keywords/:id
PATCH  /api/v1/keywords/:id
DELETE /api/v1/keywords/:id
```

### Sub-keyword

```text
POST   /api/v1/sub-keywords
GET    /api/v1/sub-keywords
GET    /api/v1/sub-keywords/:id
PATCH  /api/v1/sub-keywords/:id
DELETE /api/v1/sub-keywords/:id
```

### Article

```text
POST   /api/v1/articles
GET    /api/v1/articles
GET    /api/v1/articles/:id
PATCH  /api/v1/articles/:id
DELETE /api/v1/articles/:id
```

---

## Request Flow

```text
HTTP Request
      │
      ▼
Controller
      │
      ▼
Request DTO
      │
      ▼
Service
      │
      ▼
Repository Interface
      │
      ▼
Mongoose Repository
      │
      ▼
MongoDB
```

---

## Development Rules

### Controller

Controller chỉ:

- Nhận request.
- Validate DTO.
- Gọi service.
- Trả response.

Controller không:

- Inject Mongoose Model.
- Query MongoDB.
- Chứa business logic.

### Service

Service chỉ:

- Điều phối nghiệp vụ của feature.
- Gọi repository abstraction.

Service không:

- Biết Fastify request.
- Inject Mongoose Model.
- Query MongoDB trực tiếp.

### Interface

Interface chỉ chứa kiểu dữ liệu và repository abstraction của feature, không phụ thuộc NestJS hoặc Mongoose.

### Infrastructure

Infrastructure triển khai chi tiết kỹ thuật, nhưng không quyết định business rule.

---

## Current Development Scope

Phiên bản đầu tiên chưa sử dụng:

- Microservices
- CQRS
- Event Sourcing
- Message Broker
- Saga Pattern
- Generic Repository
- Base CRUD Service

Dự án ưu tiên cấu trúc rõ ràng, dễ kiểm thử và có khả năng mở rộng mà không thêm pattern chưa cần thiết.

---

## README Maintenance

Mỗi khi thay đổi một trong các nội dung sau, cần cập nhật lại `README.md`:

- Thêm hoặc xóa tech stack.
- Thêm module mới.
- Thay đổi cấu trúc thư mục.
- Thay đổi URL API.
- Thay đổi đường dẫn Swagger.
- Thay đổi biến môi trường.
- Thêm dịch vụ bên ngoài.
- Thay đổi quan hệ dữ liệu.
- Thay đổi cách chạy hoặc build dự án.

Không nên liệt kê công nghệ trong README chỉ vì package đã được cài. Tech stack chỉ nên ghi những công nghệ thực sự được dự án sử dụng.
