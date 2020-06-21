const { age, date } = require('../../lib/utils')
const Member = require('../models/Member')

module.exports = {
    index(req, res){
        const { filter } = req.query

        if (filter) {
            Member.findBy(filter, function(members){
                return res.render("members/index", { members, filter })
            })
        } else {
            Member.all(function(members) {
                return res.render("members/index", {members})
            })
        }
    },

    create(req, res){

        Member.instructorsSelectOptions(function(options) {
            return res.render('members/create', { instructorOptions: options})
        })

    },

    post(req, res){
        const keys = Object.keys(req.body) // ( ["avatar_url","name","birth","gender","services"])

        for (key of keys){
            if(req.body[key] == "") {
            return res.send ('Preencha todos os dados') 
            }
        }

        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`)
        })

    },

    show(req, res){
        Member.find(req.params.id, function(member) {
            if (!member) return res.send("Member not found")

            member.birth = date(member.birth).birthDay

            return res.render("members/show", { member })
        })
            
    },

    edit(req, res){
        Member.find(req.params.id, function(member) {
            if (!member) return res.send("Member not found")

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function(options){
                
                return res.render("members/edit", { member, instructorOptions: options })
            })
        })
    },

    put(req, res){
        const keys = Object.keys(req.body) // ( ["avatar_url","name","birth","gender","services"])

        for (key of keys){
            if(req.body[key] == ""){
            return res.send ('Preencha todos os dados') 
            }
        }

        Member.update(req.body, function() {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    
    delete(req, res){
        Member.delete(req.body.id, function() {
            return res.redirect(`/members`)
        })

    },
}






