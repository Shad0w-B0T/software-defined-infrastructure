import {defineConfig} from "vitepress";
import {SearchPlugin} from "vitepress-plugin-search";
import markdownIt from "markdown-it";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Software Defined Infrastructure",
    description: "A VitePress Site",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: "Home", link: "/"},
            {text: "Examples", link: "/markdown-examples"},
        ],

        sidebar: [
            {
                text: "0. Tools",
                collapsed: true,
                items: [
                    {text: "Collection", link: "/collection/terraform.md"},
                ],
            },
            {
                text: "1. Server creation",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_1/index.md"},
                    {text: "Firewall", link: "/exercise/exercise_1/firewall.md"},
                    {text: "Create Server", link: "/exercise/exercise_1/server.md"},
                    {
                        text: "Reset Root Password",
                        link: "/exercise/exercise_1/root_password.md",
                    },
                    {text: "Connect Server", link: "/exercise/exercise_1/connect.md"},
                    {
                        text: "Delete Server",
                        link: "/exercise/exercise_1/server_delete.md",
                    },
                ],
            },
            {
                text: "2. Server re-creation",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_2/index.md"},
                    {text: "List ip's", link: "/exercise/exercise_2/list.md"},
                    {
                        text: "ReCreate a Server",
                        link: "/exercise/exercise_2/recreate.md",
                    },
                ],
            },
            {
                text: "3. Improve your server's security!",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_3/index.md"},
                    {text: "Setup Nginx", link: "/exercise/exercise_3/nginx.md"},
                    {text: "Create SSH Key", link: "/exercise/exercise_3/ssh.md"},
                ],
            },
            {
                text: "4. ssh-agent installation",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_4/index.md"},
                ],
            },
            {
                text: "5. MI Gitlab access by ssh",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_5/index.md"},
                ],
            },
            {
                text: "6. ssh host hopping",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_6/index.md"},
                ],
            },

            {
                text: "7. ssh port forwarding",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_7/index.md"},
                ],
            },

            {
                text: "8. ssh X11 forwarding",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_8/index.md"},
                ],
            },

            {
                text: "9. Enabling index based file search",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_9/index.md"},
                ],
            },
            {
                text: "10. Using the tail -f command",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_10/index.md"},
                ],
            },
            {
                text: "11. Incrementally creating a base system",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_11/index.md"},
                    {text: "Setup", link: "/exercise/exercise_11/setup.md"},
                ],
            },
            {
                text: "12. Automatic Nginx installation",
                collapsed: true,
                items: [
                    {text: "Setup", link: "/exercise/exercise_12/setup.md"},
                ],
            },
            {
                text: "13. Working on Cloud-init",
                collapsed: true,
                items: [
                    {text: "Setup", link: "/exercise/exercise_13/setup.md"},
                ],
            },
            {
                text: "14. Solving the ~/.ssh/known_hosts quirk",
                collapsed: true,
                items: [],
            },
            {
                text: "15. Auto mounting a volume",
                collapsed: true,
                items: [
                    {text: "Description", link: "/exercise/exercise_15/index.md"},
                    {text: "Terraform", link: "/exercise/exercise_15/terraform.md"},
                ],
            },
            {
                text: "16. Mount point's name specification",
                collapsed: true,
                items: [{text: "Description", link: "/exercise/exercise_16/index.md"}],
            },
            {
                text: "17. A module for ssh host key handling",
                collapsed: true,
                items: [],
            },
            {
                text: "18. Enhancing your web server.",
                collapsed: true,
                items: [],
            },
            {
                text: "19. Creating DNS records",
                collapsed: true,
                items: [],
            },
            {
                text: "20. Creating a host with corresponding DNS entries",
                collapsed: true,
                items: [],
            },
            {
                text: "21. Creating a fixed number of servers",
                collapsed: true,
                items: [],
            },
            {
                text: "22. Creating a web certificate",
                collapsed: true,
                items: [],
            },
            {
                text: "23. Testing your web certificate",
                collapsed: true,
                items: [],
            },
            {
                text: "24. Combining certificate generation and server creation",
                collapsed: true,
                items: [],
            },
        ],

        socialLinks: [
            {icon: "github", link: "https://github.com/vuejs/vitepress"},
        ],
    },

    markdown: {
        config: (md) => {
            let counter = [0, 0, 0];
            md.core.ruler.push("custom_numbering", function (state) {
                counter = [0, 0, 0];
                state.tokens.forEach((token, idx) => {
                    if (token.type === "heading_open") {
                        const level = parseInt(token.tag[1]);
                        if (level >= 1 && level <= 3) {
                            counter[level - 1]++;
                            for (let i = level; i < 3; i++) counter[i] = 0;
                            const headingIndex = counter.slice(0, level).join(".");
                            const inline = state.tokens[idx + 1];
                            inline.content = `${headingIndex} ${inline.content}`;
                        }
                    }
                });
            });
        },
    },

    vite: {
        plugins: [
            SearchPlugin({
                previewLength: 50,
                buttonLabel: "Suche",
                placeholder: "Dokumentation durchsuchen...",
                tokenize: "full",
                //indexOptions: defaultOptions, // oder weglassen
            }),
        ],
    },
});
