# 记录一下我现在的心情吧

> 我发誓：这一篇将成为我最后一篇用中文写的 Readme

## 心得

> 逃避解决不了问题
> js 认真学
> css 重视
> html 规范

### 起因

- 别人的 Readme 写的太好<del>（行了吧）</del>
- 最近这几天，爱睡觉，但日子过得，，，心情极差，效率极低。但是我现在不想放弃了，本来我还心虚。。。。
- 走过的（分散的整整 12 个小时）的坑，（一下午）的坑，（一天）的坑太多，实在不甘心，这也是我效率低的原因。我不服气。
- 我本来真的很不喜欢写这种 blog 的东西，因为我觉得有点浪费时间，可是，谁让我今天晚上的心情这么得差，又不困，全当是发泄了。
- 今天我又来了，好烦啊，我的效率。我的时间都给了你，为啥我还是只有羡慕别人的份
- 又来写解决不了的东西了，我啥时候能写完，解决完啊，虽说百度好。我的过程：有问题=>百度（表述不好）=>再百度（看了点相关的，会了些专用词，再进一步靠近我的问题）=>看代码=> 看不懂了（心碎）=>还是 js 难，css 也很看基础
- 我 tm 又双叒(叕)来了，我真的忍不住飙脏话了，历时整两天的（24）的坑，我现在不知道是 fetch 的问题还是，逻辑还是，语法、（爆炸）
- 我前端写不下去，就弄弄后端的东西，装个 Navicat 啊、maven 啊、导入数据啊、后端坑貌似还要恶心，装个 jar 包（时耗贼长），还有个 jdbc 的，而且这个坑还是找不到的。（害怕）

## 正题

### 已经解决的问题

- `onChange`绑定三个不同、但类似的、表单提交事件

```javascript
onChange={e => this.handleChange({ username: e.target.value })}

onChange={e => this.handleChange({ password: e.target.value })}

onChange={e => this.handleChange({ remember: !e.target.value })}

//成功实例
handleChange = param => {
    this.setState({ ...this.state, ...param });
  };

//失败实例
handleChange =(e)=>{
    this.setState({
        username:e.target.value,
        password:e.target.value,
        remember:!e.target.value
    })
} // 它会说这个value不知道是哪一个
```

- 安装问题
  这里我真的要气死，我花的时间，我的心态。o(╥﹏╥)o

```npm
<!-- 失败的例子 -->

npx install -g create-react-app
create-react-app demo
cd demo
npm start

<!-- 到这里的确可以 -->
<!-- 前两步可以换成 `npx create-react-app demo` -->


<!-- 接着我想启用antd的组件库，这边我已经忘了我以前是怎么弄的，下次再试试 -->

npm i antd-init -g
antd-init

<!-- 总之就是没有webpack模块，create-react-app里有webpack，antd也有webpack，不知是不是冲突了 -->
<!-- 最终还是跟着antd的create-react-app中的教程来了 -->
```

因为我安装完 create-react-app 后发现 package.json,东西很少啊，以为啥都没有，其实它是已经安装好了的，webpack 的配置文件好像也在 bin 目录里，适合初学者，下次补个链接。

- 我要在子组件里放一个导航栏，刚刚解决完
  ![chilren_menu](https://github.com/Hazelnuttt/antd-demo/blob/master/docs/chilren_menu.png)

```javascript
//meun2子组件
render(){
  return(
    //这边不能在引用menu2组件了，因为menu2里已经引用了一个menu1，会出现两个menu1
    // <Menu2>lalala</Menu2>
    <><div>
      lalala
    </div></>
  )
}
```

```javascript
//home子组件
//一开始出现这种问题，我以为是:meun2子组件 已经不知道它是谁的儿子了，因为没`<Menu>`包起来
render(){
  return(
    <Home>
      <Menu>lalala</Menu>
      {this.props.children}
    </Home>
  )
}
```

```javascript
//于是这么改进
//=>
render(){
  return(
    <Home>
      <Menu>lalala</Menu>
       <Router>
          <Route path="/home/ter/ter_info" component={Man_info} />
          <Route path="/home/ter/add" component={Newter} />
          <Route path="/home/ter/edit_single" component={Single_edit} />
          <Route path="/home/ter/edit_batch" component={Batch_edit} />
       </Router>
    </Home>
  )
}
//到这边子组件终于找到自己在哪了
//但是，不知道是不是因为Route在子组件里的缘故，页面不能局部渲染，必须刷新后，才。。。
```

```javascript
//所以一开始死了,于是
//=>
//meun2子组件
render(){
  return(
    <div style={{ marginLeft: 250 }}>
      lalala
    </div>
  )
}
//竟然从左下角，上去了，虽然他算是home的组件（礼花）

```

- 我不知道上面那个方法怎么做到的，反正今天看来就是一坨屎，这次换了一种方法，解决了 navbar 选中的问题（看代码 8）(礼花)，完成代码后，需要把内容重新定位

```javascript
class App extends React.Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home/index" component={Home} />
          <Route path="/user/index" component={Man_user} />
          <Route path="/user/update" component={Newuser} />
          <Route path="/ter/index" component={Man_ter} />
          <Route path="/ter/ter_info" component={Man_info} />
          <Route path="/ter/add" component={Newter} />
          <Route path="/ter/edit_single" component={Single_edit} />
          <Route path="/ter/edit_batch" component={Batch_edit} />
          <Route path="/media/index" component={Media} />
          <Redirect exact from="/home" to="/home/index" />
          <Redirect exact from="/user" to="/user/index" />
          <Redirect exact from="/ter" to="/ter/index" />
        </Switch>
      </Layout>
    )
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={Register} />
          <Route path="/" render={props => LayoutRouter} />
        </div>
      </Router>
    )
  }
}
```

- 标签不要乱用，就是一个`Col`的标签 使我的 navbar 都不能选中
- margin/padding 不能混用，就是他们两个东西，使我的 navbar 都不能选中

### 未解决的问题

- 1、eslint+husky+premiter
  这边我快晕了，vscode 有插件，这三个东西好有 npm，还有规则，我不知道怎么写，npm 完，还要配置路径，还是很糊涂····我不知道我这个 project 的标配是什么啊····
- 2、导航栏 单页面切换
  ![homedemo](https://github.com/Hazelnuttt/antd-demo/blob/master/docs/homedemo.png)
  ![homedemo2](https://github.com/Hazelnuttt/antd-demo/blob/master/docs/homedemo2.png)
- 3、search/reset
  antd 貌似直接做到了，前端，增，删，改，查，今天我就光弄了一个静态 search，我本想模仿 antd,但是参数实在太多了，不理解，看不懂。不会写查询，后端如果传过来加工，修改好的一组数组，我或许·······
- 4、下拉框

```javascript
<Col offset={1} span={19} className={'h_avatar'}>
  欢迎您，
  <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" href="#">
      admin。
      <Icon type="down" />
    </a>
  </Dropdown>
</Col>
//Dropdown 里不能写东西o(╥﹏╥)o
```

- 5、导航栏
  因为我的导航栏 和 右边的 children 组件 是分开的，我的导航栏不能和我右边的东西一样高，或者希望实现和屏幕的大小一样高。查了好多，其实查之前我就知道 普遍答案是`height:100%`,然而并没有什么卵用。还有一些 js 的写法，我看了一丢丢，最后因为不知道放在哪里，放弃了。 （呲牙）
- 6、导航栏选中
  因为用的 antd,就光光简简单单的的用，点什么就选中什么，加了组件后，选中的问题还没有解决。
- 7、说 body 里不能用 div,然而改了也没有，在 js 里我丝毫不会写 html/css 了，写的东西 不是“不能交互”， 就是 “在这里不能使用”，报错！
- 8、token 这里后端用了一个新出来的东西，真真不错，放在 header 中传过来，下面可以看得很清楚,可是 res,不就是分为 body,headers 嘛，我也试过在 header 中获取，然而并没有什么卵用。、、、、、还有个插件，chrome 不翻墙不行嘛，很生气。
  ![token](https://github.com/Hazelnuttt/antd-demo/blob/master/docs/token.png)
  ![token1](https://github.com/Hazelnuttt/antd-demo/blob/master/docs/token1.png)

```javascript
handleSubmit = () => {
  const { username, password, remember } = this.state
  fetch('http://198.13.50.147:8099/api/auth/login', {
    method: 'post',
    headers: {
      // 'Accept':'application/json', //接收
      'Content-Type': 'application/json'
    }, //这两个东西不知道是哪个去接收
    body: JSON.stringify({
      username,
      password,
      remember
    })
  })
    .then(res => res.json())
    .then(res => {
      const { loginSuccess, message1, token } = res
      if (loginSuccess) {
        // 登录成功处理
        localStorage.removeItem('usesr_token')
        localStorage.setItem('user_token', token)
        // this.setState({ user: data });
        return <Redirect to="/home/user/index" />
      } else {
        // 登录失败处理
        message.error(message1)
      }
    })

  //const {token} = res.headers.get('token')
  //const {token} = res.headers.get(`token`)
  //const {token} = res.headers.get(`{token}`)
  //都试过来了
}
```

- 9、微调音量的一个组件没有

- 10、发现个奇怪的事情，跟上面的路由坑 2 应该有关，如果不要下面第一条路由，直接引用`component={Man_ter}`这个组件，应该也可以解决上面的路由问题

```javascript
          <Route path="/home/ter" component={Man_ter} />
          <Route path="/home/ter/ter_info" component={Man_info} />
          <Route path="/home/ter/add" component={Newter} />
          <Route path="/home/ter/edit_single" component={Single_edit} />
          <Route path="/home/ter/edit_batch" component={Batch_edit} />
```

- 11、编辑时，保留原始数据——子组件、父组件传数据失败
  ![component_communicate](https://github.com/Hazelnuttt/antd-demo/blob/master/docs/component_communicate.png)

```javascript
//home.js
//我看文档是在home.js里写了子组件，但是我的情况，并没有，并不是这样的
class Home extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data_edit: [],
    }
  } //编辑、新建共用一个组件

  render(){
    return(
      //这里我是没有的
      <A value={this.props.xxxx}/>
      <B value={this.props.xxxx}/>
    )
  }
}
```

```javascript
class A extends React.Component{
  constructor(props) {
    this.state = {
      data_edit: [],
    }
  }

================
}
```

```javascript
class B extends React.Component{
  constructor(props) {

  }

================
}
```

### 未解决到解决

- 导航栏单页面切换，终于弄懂了，是`Switch`的坑，这边的知识点下次再写在这里（礼花）
  ![solvehomedemo](https://github.com/Hazelnuttt/antd-demo/blob/master/src/solvehomedemo.png)
- 我终于实现了第一次用服务器传过来的 json 选取数组对象中需要的对象展示出来，不过这边还是用到了 antd 的 table，所以 map 学的还不是特别好。还要谢谢学长的一个类似服务器的东西，不过听说后面不用开着啥的，下次问问，长点知识。其实这边有一个选取需要的 json 字段，再重新组成一个新数组的东西，我再百度上找到了答案，但是心里很难过（难过），因`list.forEach(function(item){arr.push({key: item.id, username:item.username, idens:item.role})});` 你看：`forEach`我知道，是这个用法。`push`我知道，但不知道有提取的用法啊。`item.id`又是个怎么的神仙用法啊。(你需要补会来。。。)

### 状态

| 问题 | 状态 | 解决问题的小伙伴 |
| ---- | ---- | ---------------- |
| 1    | 💩   | 👤               |
| 2    | 🌟   | 👍Hazelnuttt     |
| 3    | 💩   | 👤               |
| 4    | 💩   | 👤               |
| 5    | 💩   | 👤               |
| 6    | 🌟   | 👍Hazelnuttt     |
| 7    | 💩   | 👤               |
| 8    | 💩   | 👤               |
| 9    | 💩   | 👤               |
| 10   | 💩   | 👤               |
| 11   | 💩   | 👤               |
## 这里是本人学习`react`&&`ant design组件库`的心路历程，作为纪念.==>[戳优化版](https://github.com/Hazelnuttt/ip-broadcast_ui)
