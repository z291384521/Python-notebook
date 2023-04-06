- Material

Material 是一个渲染器的组成部分，控制着物体的视觉效果，例如颜色、纹理、透明度等。Material 包含着一个或多个 Shader，并可以定义多个属性，例如颜色、纹理、透明度等。通过更换 Material，可以改变物体的外观，例如更换颜色、贴图等。

- Shader

通俗的讲，Shader 是一种跨平台的程序，可以控制物体的渲染方式，它包含了一个或多个 Pass，每个 Pass 包含了一组表面着色、纹理采样等的操作指令。Unity 中的 Shader 通常使用 Shader Lab 来编写，可以有多个 Property 来控制它的渲染表现，例如颜色、纹理、遮罩等。在使用 Unity 内置 Shader 时，通常不需要编写 Shader 代码，可以直接使用 Unity 提供的 Shader，例如 Standard Shader、LightWeight Render Pipeline （LWRP）立即渲染管线等。

- Texture

Texture 是一种用于贴图渲染的图像文件，它通常用于向 Material 添加颜色、纹理等纹理信息，通过 Texture 的设定，可以使物体更真实、更多彩。在 Unity 中，Texture 可以通过导入的方式添加到 Unity 工程中，导入后可以用于 Material 的纹理属性、Sprite 的纹理、Particle System 的粒子等。