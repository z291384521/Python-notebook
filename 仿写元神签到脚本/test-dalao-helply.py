vimport genshinhelper as gh

cookie = 'account_id=16393939; cookie_token=jPjdK4yd7oeIifkdYhkFhkkjde00hdUgh'
g = gh.Genshin(cookie)
roles = g.roles_info
print(roles)