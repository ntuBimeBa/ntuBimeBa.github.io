## 專案簡介與開發指南 ##

- 開發目標
  
  這裡是臺大生機系學會網站開發的代碼庫，**僅開放 NTU BIMEBA Server Team 人員獲取編輯權限進行合作開發**。我們期望透過系學會網站完成包含以下系務工作。

  1. 帳號管理： 登入、帳戶權限管理、個人資料查詢
     
  2. 學生空間管理表單事務： 文件下載、 簽章繳交、違規記點
     
  3. 系產服務： 驗證權限、文檔管理（排序方式與搜尋）、系產投稿
     
  4. 活動協助： 活動公告宣傳、活動報名登記系統、活動團隊對系上成員公告
     
  5. 紀錄系學會聯絡資訊
      
  6. 完成其他系上指派之任務

- 功能架構規劃
  
  此架構由 _25th伊彥_ 於 _2025/07/04_ 設計，歡迎團隊撰寫開發日誌優化 ^^

  網頁將透過網址連至首頁 `(/)`，且在主頁有其他次架構分支：

  `(/news)` 連結至 **最新消息** 分頁
  
  `(/members)` 連結至 **系學會成員** 分頁

  `(/legacy)` 連結至 **系產服務** 分頁

  `(/documents)` 連結至 **文件下載** 分頁

  `(/activity)` 連結至 **活動資訊** 分頁

  `(/contactus)` 連結至 **聯絡我們** 分頁

  請開發團隊根據以下指引完成代碼實作與維護。


## 分段開發指引 ##
以下將詳述分層架構之下的網頁實作功能：
- 最新消息
  
  條列式展示系學會最新消息的標題，每頁顯示 20 條，點進消息後可導向這項新聞的詳細頁面（新聞圖文）。這項功能不需要求使用者權限。
- 系學會成員

  簡單展示系學會權力分立架構與系學會成員資訊（職稱/姓名/聯絡資訊/大頭照）。**本服務需登入才能提供**，向原創空間管理員提出空間借用申請，發送 Gmail 給原創空間管理員以此協助系上資源利用。

- 系產服務
   
  **本服務需登入才能提供**，提供可視化系產資料展示並拒絕下載。接受同學系產投稿，此部分可提供 Google forms 連結（不推薦）或其它後端 API 實作。
- 文件下載

  提供簡潔的重要文檔下載點。
- 活動資訊

  提供**好看的（圖文並茂）** 各活動介紹與宣傳，以及連絡負責人資訊。
- 聯絡我們
  
  提供系學會 Facebook, Instagram, Threads, 系上市話與生機系官網等連結。

  (以下為 Lovable 生成專案的固有資訊)

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d4ddfe09-22f2-44bd-b6bd-744c576ccae1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d4ddfe09-22f2-44bd-b6bd-744c576ccae1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d4ddfe09-22f2-44bd-b6bd-744c576ccae1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
