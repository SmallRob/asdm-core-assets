# WeChat Mini Program Prototype Specifications

## Overview

This document specifies the requirements and standards for generating WeChat Mini Program prototypes.

## Tech Stack

| Component | Version | Notes |
|-----------|---------|-------|
| Mini Program | Latest | WeChat Native |
| TDesign | 2.x | UI Components |
| Node.js | 18.x+ | For build tools |

## UI Libraries

### Supported UI Libraries

| Library | Version | Use Case |
|---------|---------|----------|
| TDesign | 2.x | Enterprise applications |
| Vant Weapp | 3.x | Lightweight components |
| Native Components | - | Built-in components |

## Project Structure

```
project/
├── src/
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── app.acss (if using TDesign)
│   ├── pages/
│   │   ├── index/
│   │   │   ├── index.js
│   │   │   ├── index.json
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   └── detail/
│   │       ├── detail.js
│   │       ├── detail.json
│   │       ├── detail.wxml
│   │       └── detail.wxss
│   ├── components/
│   │   └── custom-component/
│   │       ├── custom-component.js
│   │       ├── custom-component.json
│   │       ├── custom-component.wxml
│   │       └── custom-component.wxss
│   ├── utils/
│   │   ├── util.js
│   │   └── api.js
│   ├── services/
│   │   └── http.js
│   └── images/
│       └── icons/
├── project.config.json
├── sitemap.json
└── README.md
```

## Configuration Files

### app.json

```json
{
  "pages": [
    "pages/index/index",
    "pages/detail/detail"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Demo App",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#409eff",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "Home",
        "iconPath": "images/home.png",
        "selectedIconPath": "images/home-active.png"
      }
    ]
  },
  "sitemapLocation": "sitemap.json"
}
```

### project.config.json

```json
{
  "description": "Project description",
  "packOptions": {
    "ignore": []
  },
  "setting": {
    "urlCheck": false,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "preloadBackgroundData": false,
    "minified": true,
    "newFeature": true,
    "coverView": true,
    "autoAudits": false,
    "showShadowRootInWxmlPanel": true,
    "scopeDataCheck": false,
    "uglifyFileName": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "compileHotReLoad": false,
    "useMultiFrameRuntime": true,
    "useApiHook": true,
    "useApiHostProcess": true,
    "babelSetting": {
      "ignore": [],
      "disablePlugins": [],
      "outputPath": ""
    },
    "enableEngineNative": false,
    "useIsolateContext": true,
    "userConfirmedBundleSwitch": false,
    "packNpmManually": false,
    "packNpmRelationList": [],
    "minifyWXSS": true
  },
  "compileType": "miniprogram",
  "libVersion": "3.0.0",
  "appid": "your-appid",
  "projectname": "demo-project",
  "condition": {}
}
```

## Page Standards

### Page Structure

```javascript
// pages/index/index.js
Page({
  data: {
    message: 'Hello World',
    list: [],
    loading: false,
  },

  onLoad(options) {
    // Called when page loads
    this.fetchData();
  },

  onShow() {
    // Called when page shows
  },

  onReady() {
    // Called when page is ready
  },

  onHide() {
    // Called when page hides
  },

  onUnload() {
    // Called when page unloads
  },

  // Custom methods
  fetchData() {
    this.setData({ loading: true });
    // Fetch data from API
    wx.request({
      url: 'https://api.example.com/data',
      success: (res) => {
        this.setData({
          list: res.data,
          loading: false,
        });
      },
      fail: () => {
        this.setData({ loading: false });
        wx.showToast({
          title: 'Failed to load',
          icon: 'none',
        });
      },
    });
  },

  handleTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    });
  },
});
```

### Page Template (WXML)

```html
<!-- pages/index/index.wxml -->
<view class="container">
  <view class="header">
    <text class="title">{{message}}</text>
  </view>

  <view class="content">
    <block wx:if="{{loading}}">
      <view class="loading">Loading...</view>
    </block>
    <block wx:else>
      <view 
        class="list-item" 
        wx:for="{{list}}" 
        wx:key="id"
        data-id="{{item.id}}"
        bindtap="handleTap"
      >
        <text class="item-title">{{item.title}}</text>
        <text class="item-desc">{{item.description}}</text>
      </view>
    </block>
  </view>
</view>
```

### Page Styles (WXSS)

```css
/* pages/index/index.wxss */
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 16px;
}

.header {
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.content {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
}

.list-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

.item-title {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}

.item-desc {
  display: block;
  font-size: 14px;
  color: #666;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #999;
}
```

## Component Standards

### Custom Component

```javascript
// components/custom-component/custom-component.js
Component({
  properties: {
    title: {
      type: String,
      value: '',
    },
    items: {
      type: Array,
      value: [],
    },
  },

  data: {
    localData: [],
  },

  lifetimes: {
    attached() {
      // Called when component is attached
    },
    detached() {
      // Called when component is detached
    },
  },

  methods: {
    handleTap(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('itemTap', { index, item: this.data.items[index] });
    },
  },
});
```

```html
<!-- components/custom-component/custom-component.wxml -->
<view class="custom-component">
  <view class="title">{{title}}</view>
  <view 
    class="item" 
    wx:for="{{items}}" 
    wx:key="index"
    data-index="{{index}}"
    bindtap="handleTap"
  >
    <text>{{item}}</text>
  </view>
</view>
```

## API Integration

### HTTP Service

```javascript
// services/http.js
const BASE_URL = 'https://api.example.com';

const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...options.header,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export const get = (url, data) => request({ url, data });
export const post = (url, data) => request({ url, data, method: 'POST' });
export const put = (url, data) => request({ url, data, method: 'PUT' });
export const del = (url, data) => request({ url, data, method: 'DELETE' });
```

### Usage

```javascript
import { get, post } from '../../services/http';

Page({
  async fetchData() {
    try {
      const data = await get('/users');
      this.setData({ list: data });
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  },
});
```

## State Management

### MobX (via mobx-miniprogram)

```javascript
// stores/counter.js
import { createStore } from 'mobx-miniprogram';

export const counterStore = createStore({
  // Observable state
  num: 0,
  
  // Computed values
  get doubleNum() {
    return this.num * 2;
  },
  
  // Actions
  increment() {
    this.num++;
  },
  
  decrement() {
    this.num--;
  },
});
```

### Usage in Page

```javascript
import { counterStore } from '../../stores/counter';

Page({
  onLoad() {
    // Bind store to page
    this.storeBindings = counterStore.bindPage(this);
  },

  onUnload() {
    this.storeBindings.destroy();
  },

  handleIncrement() {
    counterStore.increment();
  },
});
```

## TDesign Integration

### Installation

```bash
npm install tdesign-weapp --save
```

### Configuration

```json
{
  "usingComponents": {
    "t-button": "tdesign-weapp/button/button",
    "t-input": "tdesign-weapp/input/input",
    "t-cell": "tdesign-weapp/cell/cell",
    "t-toast": "tdesign-weapp/toast/toast"
  }
}
```

### Usage

```html
<t-button theme="primary" bindtap="handleTap">Primary Button</t-button>
<t-input value="{{value}}" bindchange="handleInput" placeholder="Please enter" />
<t-toast id="t-toast" />
```

## Event Handling

### Common Events

```javascript
Page({
  // Pull down refresh
  onPullDownRefresh() {
    this.fetchData();
    wx.stopPullDownRefresh();
  },

  // Reach bottom
  onReachBottom() {
    this.loadMore();
  },

  // Share
  onShareAppMessage() {
    return {
      title: 'Share Title',
      path: '/pages/index/index',
    };
  },

  // Scroll
  onPageScroll(e) {
    console.log('Scroll:', e.scrollTop);
  },
});
```

## Storage

### Local Storage

```javascript
// Save data
wx.setStorageSync('userInfo', { name: 'John' });

// Get data
const userInfo = wx.getStorageSync('userInfo');

// Remove data
wx.removeStorageSync('userInfo');

// Clear all
wx.clearStorageSync();

// Async version
wx.setStorage({ key: 'userInfo', data: { name: 'John' } });
```

## Navigation

### Navigate

```javascript
// Navigate to page
wx.navigateTo({
  url: '/pages/detail/detail?id=1',
});

// Redirect
wx.redirectTo({
  url: '/pages/detail/detail?id=1',
});

// Switch tab
wx.switchTab({
  url: '/pages/index/index',
});

// Go back
wx.navigateBack();
```

## Permissions

### Permission Configuration (app.json)

```json
{
  "permission": {
    "scope.userLocation": {
      "desc": "Your location is used for displaying nearby stores"
    }
  }
}
```

## Development Workflow

1. Install WeChat DevTools
2. Create new project or import
3. Develop in `src/` directory
4. Use "Compile" button to preview
5. Use "Upload" to upload for testing

## Testing

### Device Testing

- Use WeChat DevTools simulator
- Scan QR code with WeChat for real device testing
- Use "Preview" to test on device

### Debugging

```javascript
// Enable debugging
wx.setEnableDebug({
  enableDebug: true,
});

// Console logging
console.log('Debug info:', data);
console.error('Error:', error);
```

## Notes

- Follow WeChat Mini Program development guidelines
- Use WXS for performance-critical rendering
- Avoid large data in `data` object
- Use `setData` efficiently (batch updates)
- Handle network errors gracefully
- Test on multiple devices
- Pay attention to privacy policy compliance
