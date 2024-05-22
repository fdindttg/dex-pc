<template>
  <div class="col-md-3">
    <div class="market-pairs">
      <!-- 搜索框区域 -->
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">
            <i class="icon ion-md-search"></i>
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="keyword"
          :placeholder="$t('exchange.search')"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>

      <!-- 币种列表 -->
      <ul class="nav nav-pills" role="tablist" ref="navList">
        <li class="nav-item" v-for="(coin, index) in markets" :key="index">
          <a :class="[`nav-link`, { active: currentCoinIdx == index }]" href @click.prevent="currentCoinIdx = index">
            <!-- 查看收藏交易对 -->
            <template v-if="coin.coin_name == 'fav'">
              <i class="icon ion-md-star"></i>
            </template>
            <template v-else>
              {{ coin.coin_name }}
            </template>
          </a>
        </li>
      </ul>

      <!-- 币种行情信息，不同的交易对价值 -->
      <div class="tab-content">
        <div v-for="(coin, index) in markets" :key="index">
          <table class="table" v-if="currentCoinIdx == index">
            <thead>
              <tr style="display:block">
                <th class="w-33">{{ $t('exchange.pair') }}</th>
                <th class="w-33 text-right">{{ $t('exchange.last-price') }}</th>
                <th class="w-33 text-right">{{ $t('exchange.change') }}</th>
              </tr>
            </thead>

            <tbody>
              <tr
                style="display:block"
                :class="{ highlight: item.pair_id == marketId }"
                @click="$emit('update:symbol', item.symbol)"
                v-for="(item, key) in coin.marketInfoList"
                :key="key"
                v-show="isShow(item)"
              >
                <td class="w-33" style="white-space:nowrap">
                  <i class="icon ion-md-star h6" :class="{ active: isCoolect(item) }" @click.self="handleFav(item)"></i>
                  {{ coin.coin_name == 'fav' ? item.pair_name : item.coin_name + '/' + coin.coin_name }}
                </td>
                <td class="w-33 text-right">
                  {{ item.price | omitTo(item.price_decimals) }}
                </td>
                <td
                  class="w-33 text-right"
                  :class="item.increaseStr && item.increaseStr.startsWith('-') ? 'red' : 'green'"
                >
                  {{ item.increaseStr }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Market from '@/api/market'
import Home from '@/api/home'
export default {
  props: {
    marketList: {
      type: Array,

      // 初始化填充页面排版的数据
      default: Array(5).fill({
        coin_name: '-',
        marketInfoList: Array(10).fill({
          coin_name: '-',
          price: '-',
          increace: 0,
          increaseStr: '+0.00%'
        })
      })
    },

    isLogin: {
      type: Boolean,
      default: false
    },

    marketId: {
      type: Number,
      default: null
    },

    firstEnter: true
  },

  data() {
    return {
      keyword: '', // 搜索关键字
      current: 'fav',

      //   收藏交易对的数据结构
      favList: {
        coin_name: 'fav',
        image: require('@/assets/img/waiting.png'),
        marketInfoList: []
      },

      currentCoinIdx: 0, // 当前展示的币种

      cacheMarketList: []
    }
  },

  computed: {
    markets() {
      // 将行情列表和收藏交易对整理一起 方便渲染
      return [...this.cacheMarketList, this.favList]
    }
  },

  watch: {
    marketList(list) {
      if (list.length) {
        this.cacheMarketList = list
        let collect = this.favList.marketInfoList.map((item) => item.pair_name)
        list.forEach((parentItem) => {
          parentItem.marketInfoList.forEach((item) => {
            let idx = collect.indexOf(item.pair_name)
            if (idx != -1) {
              this.favList.marketInfoList.splice(idx, 1, item)
            }
          })
        })
      }
    }
  },

  methods: {
    /*
     * 询问用户是否登录
     *  如果已经登录 返回true
     *  如果没有登录 询问用户是否登录进行操作
     */
    inquiryLogin() {
      if (!this.isLogin) {
        this.$confirm('请先登录以进行此操作', '系统提示', {
          confirmButtonText: this.$t('home.Login'),
          cancelButtonText: this.$t('home.Cancel'),
          type: 'info'
        })
          .then(() => {
            location.href = '/login'
          })
          .catch(() => {})
        return false
      } else {
        return true
      }
    },

    // 搜索关键字
    isShow(symbol) {
      const reg = new RegExp(this.keyword, 'gi')
      if (!this.keyword) return true
      else {
        let name = symbol.coin_name || symbol.pair_name
        return name.search(reg) >= 0
      }
      // return !this.keyword || symbol.coinName.concat(symbol.pair).search(reg) >= 0;
    },

    // 是否为自选
    isCoolect(i) {
      return this.favList.marketInfoList.map((item) => item.pair_name).includes(i.pair_name)
    },

    // 获取自选交易列表
    getCollect() {
      Home.getCollect()
        .then((res) => {
          this.favList.marketInfoList = res || []
        })
        .catch((err) => {})
    },

    // 添加自选
    handleFav(item) {
      let data = {
        pair_name: item.pair_name
      }
      Home.option(data)
        .then((res) => {
          this.getCollect()
          if (res) {
            this.$message.success(this.$t('home.add'))
          } else {
            this.$message.success(this.$t('home.cancel'))
          }
        })
        .catch((err) => {})
    }
  },

  created() {
    // 如果已登陆 则写入收藏交易对
    if (this.isLogin) {
      this.getCollect()
    }
  },

  mounted() {
    // 初始化市场行情 覆盖初始化的[]
    Market.getMarketList()
      .then((data) => {
        this.cacheMarketList = data
      })
      .catch((err) => {})
  }
}
</script>

<style lang="scss">
.highlight {
  background: #f6f8f9;
  background: #f8f8ff;

  td:first-child {
    color: #007bff !important;
  }
}

.w-33 {
  display: inline-block !important;
  vertical-align: top !important;
  width: 32% !important;
}

.ion-md-star.active {
  color: #f0a70a;
}
</style>
