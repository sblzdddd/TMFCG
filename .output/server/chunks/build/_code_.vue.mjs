import __nuxt_component_2 from './index2.mjs';
import { u as useUser, V as VTooltip, _ as __nuxt_component_1, g as getMemberAvatarUrl, a as VTextField, b as useSocket, c as _sfc_main$3, d as _sfc_main$4, w as waitForConnection } from './InfoEditDialog.vue.mjs';
import { defineComponent, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, mergeProps, useSSRContext, reactive, ref, isRef } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderAttrs } from 'vue/server-renderer';
import { y as useRoom, l as VBtn, A as VAvatar, z as VSpacer } from './VSpacer.mjs';
import { V as VListItem, e as VListItemTitle, f as VListItemSubtitle } from './VListItem.mjs';
import { _ as _export_sfc, B as useRoute, u as useRouter } from './server.mjs';
import '@iconify/utils/lib/css/icon';
import '@iconify/vue';
import './v3.mjs';
import '../routes/renderer.mjs';
import 'node:async_hooks';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'engine.io';
import 'socket.io';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'node:path';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import 'socket.io-client';
import './resizeObserver.mjs';
import 'vue-router';
import 'gsap';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UserList",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, avatarUrl } = useUser();
    const { currentRoom } = useRoom();
    const roomMembers = computed(() => {
      var _a;
      return ((_a = currentRoom.value) == null ? void 0 : _a.members.filter((m) => m.id !== user.value.id)) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_2;
      const _component_User_InfoEditDialog = __nuxt_component_1;
      _push(`<!--[--><h2 class="title-with-dots" data-v-ade4bdf6>成员</h2><ul data-v-ade4bdf6>`);
      if ((_a = unref(currentRoom)) == null ? void 0 : _a.members.find((m) => m.id === unref(user).id)) {
        _push(ssrRenderComponent(VListItem, {
          class: "member-item",
          rounded: "lg",
          variant: "tonal"
        }, {
          prepend: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VAvatar, {
                image: unref(avatarUrl),
                rounded: "lg",
                border: "md",
                color: "primary",
                size: "36"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(VAvatar, {
                  image: unref(avatarUrl),
                  rounded: "lg",
                  border: "md",
                  color: "primary",
                  size: "36"
                }, null, 8, ["image"])
              ];
            }
          }),
          append: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VTooltip, {
                text: "点击：更改信息",
                location: "left"
              }, {
                activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, mergeProps({
                      icon: "",
                      variant: "text",
                      size: "small"
                    }, props), {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: "material-symbols:edit-outline-rounded",
                            size: "20"
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_User_InfoEditDialog, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "material-symbols:edit-outline-rounded",
                              size: "20"
                            }),
                            createVNode(_component_User_InfoEditDialog)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VBtn, mergeProps({
                        icon: "",
                        variant: "text",
                        size: "small"
                      }, props), {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "material-symbols:edit-outline-rounded",
                            size: "20"
                          }),
                          createVNode(_component_User_InfoEditDialog)
                        ]),
                        _: 2
                      }, 1040)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VTooltip, {
                  text: "点击：更改信息",
                  location: "left"
                }, {
                  activator: withCtx(({ props }) => [
                    createVNode(VBtn, mergeProps({
                      icon: "",
                      variant: "text",
                      size: "small"
                    }, props), {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "material-symbols:edit-outline-rounded",
                          size: "20"
                        }),
                        createVNode(_component_User_InfoEditDialog)
                      ]),
                      _: 2
                    }, 1040)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VListItemTitle, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(user).name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(user).name), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(user).isRoomOwner) {
                _push2(ssrRenderComponent(VListItemSubtitle, { class: "owner-badge" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`(房主)`);
                    } else {
                      return [
                        createTextVNode("(房主)")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(VListItemTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(user).name), 1)
                  ]),
                  _: 1
                }),
                unref(user).isRoomOwner ? (openBlock(), createBlock(VListItemSubtitle, {
                  key: 0,
                  class: "owner-badge"
                }, {
                  default: withCtx(() => [
                    createTextVNode("(房主)")
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(roomMembers), (member, index) => {
        _push(ssrRenderComponent(VListItem, {
          key: index,
          class: "member-item",
          rounded: "lg"
        }, {
          prepend: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VAvatar, {
                image: ("getMemberAvatarUrl" in _ctx ? _ctx.getMemberAvatarUrl : unref(getMemberAvatarUrl))(member.avatar),
                rounded: "lg",
                border: "md",
                color: "primary",
                size: "36"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(VAvatar, {
                  image: ("getMemberAvatarUrl" in _ctx ? _ctx.getMemberAvatarUrl : unref(getMemberAvatarUrl))(member.avatar),
                  rounded: "lg",
                  border: "md",
                  color: "primary",
                  size: "36"
                }, null, 8, ["image"])
              ];
            }
          }),
          append: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(user).isRoomOwner && member.id !== unref(user).id) {
                _push2(ssrRenderComponent(VTooltip, {
                  text: "点击：踢出成员",
                  location: "left"
                }, {
                  activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(VBtn, mergeProps({
                        icon: "",
                        variant: "text",
                        color: "error",
                        size: "small",
                        ref_for: true
                      }, props), {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_Icon, {
                              name: "material-symbols:exit-to-app-rounded",
                              size: "20"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_Icon, {
                                name: "material-symbols:exit-to-app-rounded",
                                size: "20"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(VBtn, mergeProps({
                          icon: "",
                          variant: "text",
                          color: "error",
                          size: "small",
                          ref_for: true
                        }, props), {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: "material-symbols:exit-to-app-rounded",
                              size: "20"
                            })
                          ]),
                          _: 2
                        }, 1040)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(user).isRoomOwner && member.id !== unref(user).id ? (openBlock(), createBlock(VTooltip, {
                  key: 0,
                  text: "点击：踢出成员",
                  location: "left"
                }, {
                  activator: withCtx(({ props }) => [
                    createVNode(VBtn, mergeProps({
                      icon: "",
                      variant: "text",
                      color: "error",
                      size: "small",
                      ref_for: true
                    }, props), {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "material-symbols:exit-to-app-rounded",
                          size: "20"
                        })
                      ]),
                      _: 2
                    }, 1040)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VListItemTitle, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(member.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(member.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (member.isRoomOwner) {
                _push2(ssrRenderComponent(VListItemSubtitle, { class: "owner-badge" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`(房主)`);
                    } else {
                      return [
                        createTextVNode("(房主)")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(VListItemTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(member.name), 1)
                  ]),
                  _: 2
                }, 1024),
                member.isRoomOwner ? (openBlock(), createBlock(VListItemSubtitle, {
                  key: 0,
                  class: "owner-badge"
                }, {
                  default: withCtx(() => [
                    createTextVNode("(房主)")
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></ul><!--]-->`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Room/UserList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ade4bdf6"]]);

reactive({
  messages: []
});
const useChat = () => {
  {
    return {
      messages: computed(() => []),
      sendChat: () => {
      },
      getChatHistory: () => {
      }
    };
  }
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Chat",
  __ssrInlineRender: true,
  setup(__props) {
    const { sendChat, getChatHistory, messages } = useChat();
    const { user } = useUser();
    const inputMessage = ref("");
    const onSendChat = () => {
      if (inputMessage.value.trim() === "") return;
      sendChat(inputMessage.value);
      inputMessage.value = "";
    };
    const isMyMessage = (message) => {
      return user.value.id === message.sender.id;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h2 class="title-with-dots">聊天</h2><div class="chat-list"><!--[-->`);
      ssrRenderList(unref(messages), (message) => {
        _push(`<div class="${ssrRenderClass([isMyMessage(message) ? "flex-row-reverse" : "", "chat-message"])}"><img${ssrRenderAttr("src", ("getMemberAvatarUrl" in _ctx ? _ctx.getMemberAvatarUrl : unref(getMemberAvatarUrl))(message.sender.avatar))} class="w-9 h-9 rounded-lg mt-0.5" alt="avatar"><div class="${ssrRenderClass([isMyMessage(message) ? "items-end" : "items-start", "flex flex-col max-w-[70%]"])}"><div class="${ssrRenderClass([isMyMessage(message) ? "justify-between" : "", "message-info flex flex-row items-end w-full gap-2"])}"><span class="sender">${ssrInterpolate(!isMyMessage(message) ? message.sender.name : "")}</span><span class="message-time">${ssrInterpolate(new Date(message.timestamp).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }))}</span></div><span class="message">${ssrInterpolate(message.message)}</span></div></div>`);
      });
      _push(`<!--]--></div><div class="flex flex-row gap-3 w-full">`);
      _push(ssrRenderComponent(VTextField, {
        modelValue: unref(inputMessage),
        "onUpdate:modelValue": ($event) => isRef(inputMessage) ? inputMessage.value = $event : null,
        variant: "outlined",
        density: "compact",
        label: "发送消息",
        "hide-details": "",
        onKeyup: onSendChat
      }, null, _parent));
      _push(ssrRenderComponent(VBtn, { onClick: onSendChat }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`发送`);
          } else {
            return [
              createTextVNode("发送")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[code]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const roomCode = computed(() => route.params.code);
    const { currentRoom, joinRoom, leaveRoom } = useRoom();
    const { user } = useUser();
    const { isConnected } = useSocket();
    const quitRoom = async () => {
      try {
        await waitForConnection();
        await leaveRoom();
        router.push("/");
      } catch (error) {
        console.error("Failed to leave room:", error);
        alert("无法退出房间，请稍后再试。");
      }
    };
    const copyRoomUrl = () => {
      (void 0).clipboard.writeText(`https://richup.io/room/${roomCode.value}`).then(() => {
      }).catch((err) => {
        console.error("Failed to copy:", err);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_img = _sfc_main$3;
      const _component_Common_ConnectionStatus = _sfc_main$4;
      const _component_Icon = __nuxt_component_2;
      const _component_Room_UserList = __nuxt_component_3;
      const _component_Room_Chat = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overlay-container" }, _attrs))} data-v-0ff09dbb><div class="overlay left-overlay" data-v-0ff09dbb><div class="game-title" data-v-0ff09dbb>`);
      _push(ssrRenderComponent(VTooltip, {
        text: "点击：关闭边栏",
        location: "top"
      }, {
        activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, mergeProps({
              title: "点击：关闭边栏",
              active: false,
              exact: false,
              class: "game-icon",
              variant: "text"
            }, props), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_nuxt_img, {
                    alt: "site-icon",
                    height: "24",
                    src: "/site_icon.svg",
                    width: "24"
                  }, null, _parent3, _scopeId2));
                  _push3(`<h1 class="text-xl font-bold ml-3" data-v-0ff09dbb${_scopeId2}>东方夜雀五札戏</h1>`);
                } else {
                  return [
                    createVNode(_component_nuxt_img, {
                      alt: "site-icon",
                      height: "24",
                      src: "/site_icon.svg",
                      width: "24"
                    }),
                    createVNode("h1", { class: "text-xl font-bold ml-3" }, "东方夜雀五札戏")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, mergeProps({
                title: "点击：关闭边栏",
                active: false,
                exact: false,
                class: "game-icon",
                variant: "text"
              }, props), {
                default: withCtx(() => [
                  createVNode(_component_nuxt_img, {
                    alt: "site-icon",
                    height: "24",
                    src: "/site_icon.svg",
                    width: "24"
                  }),
                  createVNode("h1", { class: "text-xl font-bold ml-3" }, "东方夜雀五札戏")
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VSpacer, null, null, _parent));
      _push(ssrRenderComponent(_component_Common_ConnectionStatus, null, null, _parent));
      _push(ssrRenderComponent(VTooltip, {
        text: "点击：退出房间",
        location: "top"
      }, {
        activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, mergeProps({
              title: "点击：退出房间",
              icon: true,
              variant: "text",
              onClick: quitRoom,
              color: "error",
              size: "small"
            }, props), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "material-symbols:exit-to-app-rounded",
                    size: "22"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "material-symbols:exit-to-app-rounded",
                      size: "22"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, mergeProps({
                title: "点击：退出房间",
                icon: true,
                variant: "text",
                onClick: quitRoom,
                color: "error",
                size: "small"
              }, props), {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "material-symbols:exit-to-app-rounded",
                    size: "22"
                  })
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="overlay-card room-url-section" data-v-0ff09dbb><h2 class="title-with-dots" data-v-0ff09dbb>邀请</h2><div class="url-container" data-v-0ff09dbb>`);
      _push(ssrRenderComponent(VTextField, {
        type: "text",
        density: "compact",
        variant: "solo-filled",
        "hide-details": "",
        value: "https://richup.io/room/" + unref(roomCode),
        readonly: ""
      }, null, _parent));
      _push(ssrRenderComponent(VTooltip, {
        text: "点击：复制房间链接",
        location: "top"
      }, {
        activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, mergeProps({
              class: "!h-10",
              size: "small",
              onClick: copyRoomUrl
            }, props), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "material-symbols:content-copy-rounded",
                    size: "20"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "material-symbols:content-copy-rounded",
                      size: "20"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, mergeProps({
                class: "!h-10",
                size: "small",
                onClick: copyRoomUrl
              }, props), {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "material-symbols:content-copy-rounded",
                    size: "20"
                  })
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="overlay-card room-settings-section grow" data-v-0ff09dbb><h2 class="title-with-dots" data-v-0ff09dbb>设置</h2><div class="room-settings-container" data-v-0ff09dbb></div></div></div><div class="game-area" data-v-0ff09dbb></div><div class="overlay right-overlay" data-v-0ff09dbb><div class="overlay-card members-list" data-v-0ff09dbb>`);
      _push(ssrRenderComponent(_component_Room_UserList, null, null, _parent));
      _push(`</div><div class="overlay-card chat-section" data-v-0ff09dbb>`);
      _push(ssrRenderComponent(_component_Room_Chat, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/room/[code].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _code_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ff09dbb"]]);

export { _code_ as default };
//# sourceMappingURL=_code_.vue.mjs.map
