const Post = require("./Post");

//resolver

const resolvers = {
  Query: {
    hello: () => {
      return "name";
    },
    getAll: async () => {
      return await Post.find();
    },
  },
  Mutation: {
    createPost: async (parent, args) => {
      const { title, description } = args.Post;
      const post = await new Post({ title, description }).save();
      return post;
    },
    updatePost: async (parent, args) => {
      const { id } = args;
      const { title, description } = args.Post;
      const post = await Post.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
      return post;
    },
    deletePost: async (parent, args) => {
      const { id } = args;
      const post = await Post.findByIdAndDelete(id);
      return "Deleted";
    },
  },
};
module.export = resolvers;

// const Post = require("./Post");
// //Resolvers
// const resolvers={
//     Query:{
//         hello:()=>{
//             return "muthukumar"
//         },
//         getAll:async()=>{
//             return await Post.find();
//         },
//     },
//     Mutation:{
//         createPost: async(parent,args,context,info)=>{
//             const {title,description} =args.post
//             const post=await new Post({title,description}).save()
//             return post
//         },
//         updatePost: async(parent,args,context,info)=>{
//             const {id}=args;
//             const {title,description}=args.post
//             const post= await Post.findByIdAndUpdate(
//                 id,
//                 {title,description},
//                 {new:true}
//             );
//             return post;
//         },
//         deletePost: async(parent,args,context,info)=>{
//             const {id}=args;
//             await Post.findByIdAndDelete(id);
//             return "Deleted"
//         }
//     },
// };
// module.exports = resolvers;
