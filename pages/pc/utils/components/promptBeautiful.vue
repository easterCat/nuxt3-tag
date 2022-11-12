<template>
  <div class="tranfer-con">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <app-animate name="fadeIn">
          <el-input
            v-model="textArea"
            type="textarea"
            placeholder="请输入promit"
            :rows="10"
            clearable
            show-word-limit
            maxlength="3000"
          />
        </app-animate>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <app-animate name="fadeIn">
          <el-input
            v-model="formatTextArea"
            type="textarea"
            placeholder="输出prompt"
            :rows="10"
            @click="copyFormatPrompt"
          />
        </app-animate>
      </el-col>
    </el-row>
    <app-animate name="fadeIn">
      <div class="button-con">
        <PcAnimationButton
          :buttonStyle="1"
          buttonColor="144, 147, 153"
          buttonAngel="145deg"
          buttonWidth="160px"
          buttonText="Prompt格式化(常规)"
          @submit="promptFormat"
        ></PcAnimationButton>
        <PcAnimationButton
          :buttonStyle="1"
          buttonColor="144, 147, 153"
          buttonAngel="145deg"
          buttonWidth="90px"
          buttonText="一键清空"
          @submit="clearPrompt"
        ></PcAnimationButton>
        <PcAnimationButton
          :buttonStyle="1"
          buttonColor="144, 147, 153"
          buttonAngel="145deg"
          buttonWidth="200px"
          buttonText="中括号转圆括号(先格式化)"
          @submit="mediumToCircle"
        ></PcAnimationButton>
        <PcAnimationButton
          :buttonStyle="1"
          buttonColor="144, 147, 153"
          buttonAngel="145deg"
          buttonWidth="200px"
          buttonText="圆括号转中括号(先格式化)"
          @submit="circleToMedium"
        ></PcAnimationButton>
        <PcAnimationButton
          :buttonStyle="1"
          buttonColor="144, 147, 153"
          buttonAngel="145deg"
          buttonWidth="130px"
          buttonText="Prompt起手式"
          @submit="addHighQualityPrompt"
        ></PcAnimationButton>
        <PcAnimationButton
          :buttonStyle="1"
          buttonColor="144, 147, 153"
          buttonAngel="145deg"
          buttonWidth="200px"
          buttonText="空格加逗号(用于danbooru)"
          @submit="tagsAddComma"
        ></PcAnimationButton>
        <PcAnimationButton
          :buttonStyle="1"
          buttonColor="144, 147, 153"
          buttonAngel="145deg"
          buttonWidth="200px"
          buttonText="去除下划线(用于danbooru)"
          @submit="promotRemoveLine"
        ></PcAnimationButton>
      </div>
    </app-animate>

    <pc-area-title title="Prompt列表"></pc-area-title>
    <div class="tags-con" v-if="promptList && promptList?.length">
      <template v-for="(tag, tIndex) in promptList" :key="tIndex">
        <app-animate name="fadeIn">
          <el-tag class="tag-style" size="large" effect="dark" closable @close="removeTag(tIndex)">
            {{ tag }}
          </el-tag>
        </app-animate>
      </template>
      <div>
        <el-button shadow="always" type="warning" size="large" @click="tagsReplacePrompt">
          当前tags替换prompt
        </el-button>
      </div>
    </div>

    <div class="tags-con" v-else>
      <p class="no-data">暂无列表</p>
    </div>

    <pc-area-title title="Prompt记录"></pc-area-title>

    <div class="history-con" v-if="promptHistory && promptHistory?.length">
      <template v-for="(history, hIndex) in promptHistory" :key="hIndex">
        <app-animate name="fadeIn">
          <div class="history-item">
            <p>{{ history }}</p>
            <div class="history-button">
              <el-button type="info" @click="setHistory(history)">
                <slot name="icon"><i-ep-check></i-ep-check></slot>
                选择
              </el-button>
              <el-button type="success" @click="copy(history)">
                <slot name="icon"><i-ep-document-copy></i-ep-document-copy></slot>
                复制
              </el-button>
              <el-button type="danger" @click="removeHistory(hIndex)">
                <slot name="icon"><i-ep-delete></i-ep-delete></slot>
                删除
              </el-button>
            </div>
          </div>
        </app-animate>
      </template>
    </div>
    <div class="tags-con" v-else>
      <p class="no-data">暂无记录</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, Ref } from 'vue';
import { copyText } from 'vue3-clipboard';

// data
const key = 'prompt_history';
const { $store } = useNuxtApp();
const textArea: Ref<string> = ref('');
const formatTextArea: Ref<string> = ref('');
const promptList: Ref<string[]> = ref<string[]>([]);
const promptHistory: Ref<string[]> = ref<string[]>([]);

// mounted
onMounted(() => {
  getData();
});

// methods
const promptFormat = () => {
  formatTextArea.value = textArea.value.replace(/\s*(，+|,+)\s*/g, ',');
  promptList.value = formatTextArea.value
    .split(',')
    .filter(i => !!i)
    .map(i => i.trim());
  saveData(textArea.value);
};

const tagsAddComma = () => {
  formatTextArea.value = textArea.value.replace(/\s+/g, ', ');
  promptList.value = formatTextArea.value
    .split(',')
    .filter(i => !!i)
    .map(i => i.trim());
  saveData(textArea.value);
};

const promotRemoveLine = () => {
  formatTextArea.value = textArea.value.replace(/[-_]+/g, ' ');
  promptList.value = formatTextArea.value
    .split(',')
    .filter(i => !!i)
    .map(i => i.trim());
  saveData(textArea.value);
};

const mediumToCircle = () => {
  formatTextArea.value = textArea.value.replace(/\{/g, '(').replace(/\}/g, ')');
  promptList.value = formatTextArea.value
    .split(/,/g)
    .filter(i => !!i)
    .map(i => i.trim());
  saveData(textArea.value);
};

const circleToMedium = () => {
  formatTextArea.value = textArea.value.replace(/\(/g, '{').replace(/\)/g, '}');
  promptList.value = formatTextArea.value
    .split(/,/g)
    .filter(i => !!i)
    .map(i => i.trim());
  saveData(textArea.value);
};

const addHighQualityPrompt = () => {
  if (textArea.value.includes('masterpiece')) {
    return ElMessage({
      showClose: true,
      message: '请不要重复添加',
      type: 'warning',
    });
  } else {
    textArea.value = 'masterpiece, best quality, ' + textArea.value;
    formatTextArea.value = textArea.value.replace(/\s*(，+|,+)\s*/g, ',');
    promptList.value = formatTextArea.value
      .split(',')
      .filter(i => !!i)
      .map(i => i.trim());
    saveData(textArea.value);
  }
};

const clearPrompt = () => {
  textArea.value = '';
  formatTextArea.value = '';
  promptList.value = [];
};

const tagsReplacePrompt = () => {
  textArea.value = promptList.value.join(', ');
  formatTextArea.value = promptList.value.join(', ');
};

const copyFormatPrompt = () => {
  copy(formatTextArea.value);
};

const saveData = (data: string) => {
  let arr = [];

  if (!data) {
    return ElMessage({
      showClose: true,
      message: '请输入prompt',
      type: 'warning',
    });
  }

  if ($store.get(key)) {
    arr = JSON.parse($store.get(key)) ?? [];
  }

  if (arr && arr.length && arr.length > 30) {
    return ElMessage({
      showClose: true,
      message: '数据超过30条',
      type: 'warning',
    });
  }

  if (!arr.includes(data)) {
    arr.push(data);
  }

  promptHistory.value = [...arr];
  $store.set('prompt_history', JSON.stringify(promptHistory.value));
};

const getData = () => {
  if ($store.get(key)) {
    promptHistory.value = JSON.parse($store.get(key));
  }
};

const removeTag = (index: number) => {
  promptList.value.splice(index, 1);
};

const setHistory = (data: string) => {
  textArea.value = data;
};

const removeHistory = (index: number) => {
  let arr = JSON.parse($store.get(key)) ?? [];
  arr.splice(index, 1);
  promptHistory.value = [...arr];
  $store.set('prompt_history', JSON.stringify(promptHistory.value));
};

const copy = (data: string) => {
  copyText(data, undefined, (error: any, event: any) => {
    if (error) {
      console.log(error);
    } else {
      return ElMessage({
        showClose: true,
        message: '复制成功',
        type: 'success',
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.tranfer-con {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;

  .el-textarea {
    width: 100%;
    margin-bottom: 20px;
  }
}

.button-con {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .animation-button {
    margin-bottom: 10px;
  }
}

:deep(.el-textarea) {
  border: 1px solid #f1f1f1;
  border-radius: 10px;
}

.history-item {
  padding: 20px;
  background-color: #fee4cb;
  color: gray;
  border-radius: 10px;
  margin-bottom: 10px;

  .history-button {
    margin-top: 10px;
  }
}

.tag-style {
  margin: 0 8px 8px 0px;
}

.no-data {
  color: gray;
}
</style>
